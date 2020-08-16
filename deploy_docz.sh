#!/bin/bash

yarn docz:build
echo react-native-responsive-linechart.surge.sh > .docz/dist/CNAME
cd .docz/dist
echo -ne '\n' | surge