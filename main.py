import os
import subprocess
import time
import asyncio
import re
import json

import base64, ssl, certifi
from pathlib import Path
from json import dumps as jsonDumps
from itertools import chain

# The decky plugin module is located at decky-loader/plugin
# For easy intellisense checkout the decky-loader code one directory up
# or add the `decky-loader/plugin` path to `python.analysis.extraPaths` in `.vscode/settings.json`
import decky_plugin

from subprocess import Popen, PIPE
from urllib.error import HTTPError
from urllib.request import urlopen, Request

confdir = os.environ["DECKY_PLUGIN_SETTINGS_DIR"]

class Plugin:

    async def emudeck(self, command):
        # decky_plugin.logger.info("cloud_decky_check_status")
        bash_command = ". $HOME/.config/EmuDeck/backend/functions/all.sh && " + command
        result = subprocess.run(bash_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        # decky_plugin.logger.info(result)
        # decky_plugin.logger.info(result.stdout)
        # decky_plugin.logger.info(result.stderr)
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
        # Define a regex pattern to find lines with variables and values
        pattern = re.compile(r'([A-Za-z_][A-Za-z0-9_]*)=(.*)')

        # Path to the configuration file
        user_home = os.path.expanduser("~")
        config_file_path = os.path.join(user_home, 'emudeck', 'settings.sh')

        # Create a dictionary to store variables and their values
        configuration = {}

        # Open the configuration file and process each line
        with open(config_file_path, 'r') as file:
            for line in file:
                # Search for matches in the current line
                match = pattern.search(line)
                if match:
                    variable = match.group(1)
                    value = match.group(2)
                    configuration[variable] = value


        bash_command = "cd $HOME/.config/EmuDeck/backend/ && git rev-parse --abbrev-ref HEAD"
        result = subprocess.run(bash_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        configuration["branch"] = result.stdout.strip()

        # Convert the dictionary into a JSON object
        json_configuration = json.dumps(configuration, indent=4)

        # Print the resulting JSON
        return json_configuration

    # Asyncio-compatible long-running code, executed in a task when the plugin is loaded
    async def _main(self):
        bash_command = "cd $HOME/.config/EmuDeck/backend/ && git reset --hard && git pull"
        result = subprocess.run(bash_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        try:
            sc = open(os.path.join(confdir, "scid.txt"), "x")
            sc.close()
        except FileExistsError:
            pass



    # Function called first during the unload process, utilize this to handle your plugin being removed
    async def _unload(self):
        # decky_plugin.logger.info("Goodbye World!")
        pass

    # Migrations that should be performed before entering `_main()`.
    async def _migration(self):
        # decky_plugin.logger.info("Migrating")
        # Here's a migration example for logs:
        # - `~/.config/decky-template/template.log` will be migrated to `decky_plugin.DECKY_PLUGIN_LOG_DIR/template.log`
        decky_plugin.migrate_logs(os.path.join(decky_plugin.DECKY_USER_HOME,
                                               ".config", "decky-template", "template.log"))
        # Here's a migration example for settings:
        # - `~/homebrew/settings/template.json` is migrated to `decky_plugin.DECKY_PLUGIN_SETTINGS_DIR/template.json`
        # - `~/.config/decky-template/` all files and directories under this root are migrated to `decky_plugin.DECKY_PLUGIN_SETTINGS_DIR/`
        decky_plugin.migrate_settings(
            os.path.join(decky_plugin.DECKY_HOME, "settings", "template.json"),
            os.path.join(decky_plugin.DECKY_USER_HOME, ".config", "decky-template"))
        # Here's a migration example for runtime data:
        # - `~/homebrew/template/` all files and directories under this root are migrated to `decky_plugin.DECKY_PLUGIN_RUNTIME_DIR/`
        # - `~/.local/share/decky-template/` all files and directories under this root are migrated to `decky_plugin.DECKY_PLUGIN_RUNTIME_DIR/`
        decky_plugin.migrate_runtime(
            os.path.join(decky_plugin.DECKY_HOME, "template"),
            os.path.join(decky_plugin.DECKY_USER_HOME, ".local", "share", "decky-template"))



