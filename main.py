import os, json, platform
import subprocess
import re
from glob import glob
import decky_plugin
from pathlib import Path
from types import SimpleNamespace

def log(txt):
    decky_plugin.logger.info(txt)

def warn(txt):
    decky_plugin.logger.warn(txt)


def error(txt):
    decky_plugin.logger.error(txt)

# Directorio de configuración del plugin
confdir = os.environ["DECKY_PLUGIN_SETTINGS_DIR"]

system = platform.system().lower()  # 'linux', 'darwin', 'windows'
home = Path.home()
emudeck_backend = home / ".config/EmuDeck/backend"
emudeck_folder = home / ".config/EmuDeck"
emudeck_logs = home / ".config/EmuDeck/logs/"
temp_dir=home/"Downloads"
app_folder=home/"Applications"
emus_folder=app_folder
esde_folder=app_folder
pegasus_folder=app_folder

if system.startswith("win"):
    appdata_roaming = Path(os.environ.get("APPDATA"))
    emudeck_backend = Path(os.path.expandvars(appdata_roaming / "EmuDeck/backend"))
    emudeck_folder = Path(os.path.expandvars(appdata_roaming / "EmuDeck"))
    emudeck_logs =  Path(os.path.expandvars(appdata_roaming / "EmuDeck/logs"))
    emudeck_temp = Path(os.path.expandvars(appdata_roaming / "EmuDeck/temp"))
    app_folder=Path(os.path.expandvars(emudeck_folder / "Emulators"))
    emus_folder=Path(os.path.expandvars(app_folder))
    esde_folder=Path(os.path.expandvars(emudeck_folder / "EmulationStation-DE"))
    pegasus_folder=Path(os.path.expandvars(emudeck_folder / "Pegasus"))

class Plugin:

    async def emudeck(self, command):

        if os.name == 'nt':
            bash_command = f"python {emudeck_backend}/api.py {command}"
        else:
            bash_command = f"python3 {emudeck_backend}/api.py {command}"

        log(bash_command)

        result = subprocess.run(bash_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        cleaned_stdout = result.stdout.strip()

        os.makedirs(emudeck_logs, exist_ok=True)

        # Escribir el resultado en un archivo de log
        log_file_path = os.path.join(emudeck_logs, 'decky.log')
        with open(log_file_path, 'w') as archivo:
            archivo.write("STDOUT:\n")
            archivo.write(result.stdout)
            archivo.write("\n\nSTDERR:\n")
            archivo.write(result.stderr)

        return cleaned_stdout

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

        if os.name == 'nt':
            bash_command = f"cd {appdata_roaming}/EmuDeck/backend/ && git rev-parse --abbrev-ref HEAD"
        else:
            bash_command = "cd $HOME/.config/EmuDeck/backend/ && git rev-parse --abbrev-ref HEAD"
        result = subprocess.run(bash_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        branch = result.stdout.strip()

        json_settings_path = Path(emudeck_folder) / "settings.json"
        if json_settings_path.exists():
            with open(json_settings_path, encoding='utf-8') as jf:
                json_configuration=SimpleNamespace()
                # Aquí json.load lee y va aplicando object_hook a cada dict
                settings = json.load(jf, object_hook=lambda d: SimpleNamespace(**d))

                installationPath=settings.storagePath
                tools_path=Path(os.path.expandvars(installationPath+"/Emulation/tools"))
                if hasattr(settings, "cloud_sync_status"):
                    json_configuration.cloud_sync_status = settings.cloud_sync_status
                else:
                    json_configuration.cloud_sync_status = False

                if hasattr(settings, "netPlay"):
                    json_configuration.netPlay = settings.netPlay
                else:
                    json_configuration.netPlay = False

                json_configuration.RABezels = settings.bezels
                json_configuration.RAHandClassic2D = settings.shaders.classic
                json_configuration.RAHandClassic3D = settings.shaders.classic3d
                json_configuration.RAHandHeldShader = settings.shaders.handhelds
                json_configuration.RAautoSave = settings.autosave
                json_configuration.arClassic3D = settings.ar.classic3d
                json_configuration.arDolphin = settings.ar.dolphin
                json_configuration.arSega = settings.ar.sega
                json_configuration.arSnes = settings.ar.snes
                json_configuration.branch = branch
                json_configuration.systemOS = os.name
                json_configuration.toolsPath = str(tools_path)
                return json.dumps(json_configuration.__dict__, indent=4)

    async def _main(self):
        if os.name == 'nt':
            bash_command = f"cd {appdata_roaming}/EmuDeck/backend/ && git reset --hard && git pull"
        else:
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