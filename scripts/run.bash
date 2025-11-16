#!/usr/bin/env bash

##########
# TO RUN LOCALLY
# pushd $FRONTEND_DIR
# . ../backend/venv/bin/activate.fish
# ENV=local FOXYLIB_DIR=$HOME/project/foxylib/foxylib ./scripts/run.bash

set -eu

ARG0=${BASH_SOURCE[0]}
FILE_PATH=$(readlink -f $ARG0)
FILE_DIR=$(dirname $FILE_PATH)
FILE_NAME=$(basename $FILE_PATH)

errcho(){ >&2 echo $@; }
func_count2reduce(){
    local v="${1?missing}"; local cmd="${2?missing}"; local n=${3?missing};
    for ((i=0;i<$n;i++)); do v=$($cmd $v) ; done; echo "$v"
}

export REPO_DIR=$(func_count2reduce $FILE_DIR dirname 1)
FRONTEND_DIR=$REPO_DIR/frontend


main(){
    pushd $FRONTEND_DIR

    local RUNMODE=${RUNMODE:-"DEV"}
    # errcho "ENV=$ENV"
    if($RUNMODE=='BUILD');
    then 
        yarn build
        yarn start
    else
        yarn run dev
    fi
    popd
}

errcho "[$FILE_NAME] START"
main
# pushd $FRONTEND_DIR
# yarn run dev
# popd
errcho "[$FILE_NAME] END"

# ./scripts/run.bash # "yarn run dev"
# RUNMODE=BUILD ./scripts/run.bash # 'yarn start'
