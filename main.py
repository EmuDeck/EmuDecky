import os
import subprocess
import re
import json
from glob import glob
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
        bash_command = ". $HOME/.config/EmuDeck/backend/functions/all.sh && " + command
        result = subprocess.run(bash_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
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
        bash_command = "cd $HOME/.config/EmuDeck/backend/ && git reset --hard && git pull && . $HOME/.config/EmuDeck/backend/functions/all.sh && generateGameLists"

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