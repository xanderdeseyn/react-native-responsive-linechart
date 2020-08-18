#!/bin/bash
set -e
cd docusaurus
yarn build
echo react-native-responsive-linechart.surge.sh > build/CNAME
cd build
echo -ne '\n' | surge