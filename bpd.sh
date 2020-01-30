#!/bin/bash
# (B)uild (P)ackage and (D)eploy calculator plugin to site plugin folder
# assumes 'my-florida-prepaid' and 'fpcb-calculator' folders are sibling directories
set -e
yarn build
yarn package
rm ../my-florida-prepaid/wp-content/plugins/fpcb-calculators/*
cp -R dist/. ../my-florida-prepaid/wp-content/plugins/fpcb-calculators/