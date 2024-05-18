import os
import subprocess
import re
import json
from glob import glob

# Importar decky_plugin
import decky_plugin

# Directorio de configuración del plugin
confdir = os.environ["DECKY_PLUGIN_SETTINGS_DIR"]

class Plugin:
    async def emudeck(self, command):
        bash_command = ". $HOME/.config/EmuDeck/backend/functions/all.sh && " + command
        result = subprocess.run(bash_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        cleaned_stdout = result.stdout.strip()
        return cleaned_stdout

    async def emudeck_dirty(self, command):
        decky_plugin.logger.info("cloud_decky_check_status")
        bash_command = ". $HOME/.config/EmuDeck/backend/functions/all.sh && " + command
        result = subprocess.run(bash_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        decky_plugin.logger.info(result)
        decky_plugin.logger.info(result.stdout)
        decky_plugin.logger.info(result.stderr)
        cleaned_stdout = result.stdout.strip()
        return result.stdout

    # START QL
    async def get_id(self):
        with open(os.path.join(confdir, "scid.txt"), "r") as sc:
            id = sc.read()
            try:
                id = int(id)
                return id
            except ValueError:
                return -1

    async def set_id(self, id):
        with open(os.path.join(confdir, "scid.txt"), "w") as sc:
            sc.write(str(id))
    # END QL

    async def getSettings(self):
        pattern = re.compile(r'([A-Za-z_][A-Za-z0-9_]*)=(.*)')
        user_home = os.path.expanduser("~")
        config_file_path = os.path.join(user_home, 'emudeck', 'settings.sh')
        configuration = {}

        with open(config_file_path, 'r') as file:
            for line in file:
                match = pattern.search(line)
                if match:
                    variable = match.group(1)
                    value = match.group(2)
                    configuration[variable] = value

        bash_command = "cd $HOME/.config/EmuDeck/backend/ && git rev-parse --abbrev-ref HEAD"
        result = subprocess.run(bash_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        configuration["branch"] = result.stdout.strip()

        json_configuration = json.dumps(configuration, indent=4)
        return json_configuration

    async def _main(self):
        bash_command = "cd $HOME/.config/EmuDeck/backend/ && git reset --hard && git pull"
        result = subprocess.run(bash_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        try:
            sc = open(os.path.join(confdir, "scid.txt"), "x")
            sc.close()
        except FileExistsError:
            pass

    async def _unload(self):
        pass

    async def _migration(self):
        decky_plugin.migrate_logs(os.path.join(decky_plugin.DECKY_USER_HOME,
                                               ".config", "decky-template", "template.log"))
        decky_plugin.migrate_settings(
            os.path.join(decky_plugin.DECKY_HOME, "settings", "template.json"),
            os.path.join(decky_plugin.DECKY_USER_HOME, ".config", "decky-template"))
        decky_plugin.migrate_runtime(
            os.path.join(decky_plugin.DECKY_HOME, "template"),
            os.path.join(decky_plugin.DECKY_USER_HOME, ".local", "share", "decky-template"))

    # Nueva funcionalidad para generar el JSON con los juegos
    def get_metadata_values(self, metadata_path):
        with open(metadata_path, 'r') as file:
            data = file.read()
        metadata = {}
        for line in data.splitlines():
            if ':' in line:
                key, value = line.split(':', 1)
                metadata[key.strip()] = value.strip()
        return metadata

    def get_games(self, directory, extensions):
        games = []
        extensions = [ext.strip().lower() for ext in extensions.split('|')]
        for root, dirs, files in os.walk(directory):
            for file in files:
                file_path = os.path.join(root, file)
                extension = os.path.splitext(file)[-1][1:].lower()
                if extension in extensions:
                    name = os.path.splitext(file)[0]
                    games.append({"name": name, "filename": file_path})
        games.sort(key=lambda x: x["name"])
        return games

    async def generate_roms_json(self):
        roms_dir = '/run/media/mmcblk0p1/Emulation/roms'
        systems = []

        for system_dir in glob(f'{roms_dir}/*/'):
            metadata_path = os.path.join(system_dir, 'metadata.txt')
            if os.path.isfile(metadata_path):
                metadata = self.get_metadata_values(metadata_path)
                extensions = metadata.get('extensions', '').replace(',', '|').lower()
                games = self.get_games(system_dir, extensions)
                if games:
                    systems.append({
                        "title": metadata.get('collection'),
                        "id": metadata.get('shortname'),
                        "launcher": metadata.get('launch'),
                        "games": games
                    })

        # Devolver el JSON como cadena
        return json.dumps(systems, indent=4)

# Ejemplo de uso:
# plugin = Plugin()
# asyncio.run(plugin.generate_roms_json())
