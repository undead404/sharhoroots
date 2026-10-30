#!/bin/sh
# Keep archival data outside the published Quartz vault.
set -eu
exec nysh --workspace "${NYSHPORKA_WORKSPACE:-$HOME/Documents/Нишпорка}" "$@"
