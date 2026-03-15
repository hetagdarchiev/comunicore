#!/bin/bash
# copy deployment files to target directory
set -e

pushd . > /dev/null
cd "$( dirname "${BASH_SOURCE[0]}" )/../.."
PROJECT_ROOT="$(pwd)"
popd > /dev/null

function deploy_copy_files() {
    local DST_DIR="$1" # can be relative path
    if [ ! -d "$DST_DIR" ]; then
      echo "error: destination directory not exists: \"$DST_DIR\""
      exit 1
    fi
       pushd . > /dev/null
    cd "$DST_DIR"
    DST_DIR="$(pwd)"
    cd "$PROJECT_ROOT"
       mkdir -p "$DST_DIR"/backend "$DST_DIR"/frontend
    cp -a ./backend/internal/repository/migrations \
        ./backend/config/server-config.toml \
        ./backend/target/comunicore \
        ./backend/target/migrate "$DST_DIR"/backend

    cp ./backend/config/comunicore.service "$DST_DIR"

    cp -a ./frontend/out/./ "$DST_DIR"/frontend

    popd > /dev/null
}
