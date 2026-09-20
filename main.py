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

# Traducción de comandos del frontend (decky_*) al backend bash: (setting, función bash)
LEGACY_TOGGLES = {
    "decky_autoSave": ("RAautoSave", "Decky_autoSave"),
    "decky_bezels": ("RABezels", "Decky_bezels"),
    "decky_shaders_LCD": ("RAHandHeldShader", "Decky_shaders_LCD"),
    "decky_shaders_2D": ("RAHandClassic2D", "Decky_shaders_2D"),
    "decky_shaders_3D": ("RAHandClassic3D", "Decky_shaders_3D"),
    "decky_netplay": ("netPlay", None),
    "decky_cloud_sync_status": ("cloud_sync_status", None),
}
LEGACY_SETTERS = {
    "decky_set_ar_sega": ("arSega", "RetroArch_setCustomizations"),
    "decky_set_ar_nintendo": ("arSnes", "RetroArch_setCustomizations"),
    "decky_set_ar_3d": ("arClassic3D", "Decky_setAR"),
    "decky_set_ar_dolphin": ("arDolphin", "Dolphin_setCustomizations"),
}

def get_mode():
    """Devuelve CURRENT si el backend es Python (api.py) o LEGACY si es bash."""
    return "CURRENT" if (Path(emudeck_backend) / "api.py").exists() else "LEGACY"

def legacy_settings_path():
    """Ruta del settings.sh (o settings.ps1 en Windows) del backend bash."""
    if os.name == 'nt':
        return Path(os.path.expanduser("~")) / "emudeck" / "settings.ps1"
    return Path(emudeck_folder) / "settings.sh"

def parse_legacy_value(raw):
    """Convierte un valor de settings.sh a bool/int/str."""
    value = raw.strip().replace('"', '').replace("'", "")
    if value.lower() == "true":
        return True
    if value.lower() == "false":
        return False
    if re.fullmatch(r"-?\d+", value):
        return int(value)
    return value

def read_legacy_settings():
    """Lee settings.sh del backend bash y lo devuelve como dict."""
    pattern = re.compile(r'^\$?([A-Za-z_][A-Za-z0-9_]*)=(.*)$')
    configuration = {}
    path = legacy_settings_path()
    if not path.exists():
        return configuration
    with open(path, 'r', encoding='utf-8') as file:
        for line in file:
            match = pattern.search(line.strip())
            if match:
                configuration[match.group(1)] = parse_legacy_value(match.group(2))
    return configuration

def legacy_command(command):
    """Traduce un comando decky_* a 'setSetting X Y && Funcion' para el backend bash."""
    parts = command.split()
    if not parts:
        return command
    name, args = parts[0], parts[1:]
    if name in LEGACY_TOGGLES:
        setting, func = LEGACY_TOGGLES[name]
        current = read_legacy_settings().get(setting, False)
        new_value = "false" if current is True else "true"
        cmd = f"setSetting {setting} {new_value}"
        return f"{cmd} && {func}" if func else cmd
    if name in LEGACY_SETTERS and args:
        setting, func = LEGACY_SETTERS[name]
        return f"setSetting {setting} {args[0]} && {func}"
    return command

def build_shell_command(command):
    """Construye la línea de shell según el backend detectado."""
    if get_mode() == "CURRENT":
        python_bin = "python" if os.name == 'nt' else "python3"
        return f"{python_bin} {emudeck_backend}/api.py {command}"
    command = legacy_command(command)
    if os.name == 'nt':
        ps1_file = Path(emudeck_backend) / "functions" / "all.ps1"
        return fr'PowerShell -ExecutionPolicy Bypass -Command "& {{. \"{ps1_file}\"; {command}}}"'
    return f". {emudeck_backend}/functions/all.sh && {command}"

class Plugin:

    async def emudeck(self, command):

        bash_command = build_shell_command(command)

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
            result = subprocess.run(bash_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            branch = result.stdout.strip()
        else:
            head_path = home / ".config/EmuDeck/backend/.git/HEAD"
            with open(head_path, "r") as f:
                ref = f.read().strip()
            if ref.startswith("ref:"):
                branch = ref.split("/")[-1]
            else:
                branch = ref  # commit hash si está en detached HEAD

        if get_mode() == "LEGACY":
            configuration = read_legacy_settings()
            defaults = {"cloud_sync_status": False, "netPlay": False, "RABezels": False,
                        "RAHandClassic2D": False, "RAHandClassic3D": False, "RAHandHeldShader": False,
                        "RAautoSave": False, "arClassic3D": 43, "arDolphin": 43, "arSega": 43, "arSnes": 43}
            for key, value in defaults.items():
                configuration.setdefault(key, value)
            configuration["branch"] = branch
            configuration["systemOS"] = os.name
            configuration["toolsPath"] = str(configuration.get("toolsPath", ""))
            return json.dumps(configuration, indent=4)

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