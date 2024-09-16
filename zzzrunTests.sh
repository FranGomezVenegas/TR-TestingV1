#!/bin/bash

# Upload file to remote server
# npx playwright test tests/instruments/ActiveIntruments.spec.ts  --project=chromium
declare -A test_cases=(
    ["Case1"]="Instruments|ActiveIntruments|Deactivate"
	["Case2"]="Instruments|ActiveIntruments|NewInstrumentAlreadyExists"
    #["Case3"]="Instruments-InternalDevs|Grid-ActionsNoDialog|GridActionNoDialog"
)

for case in "${!test_cases[@]}"; do
	IFS="|" read -r area view_name script_name <<< "${test_cases[$case]}"
	
	#npx playwright test $area-$view_name.spec.ts -g "$script_name" --project=chromium
	npx playwright test "$area-$view_name.spec.ts" -g "$script_name" --project=chromium --reporter=list,json
	mkdir -p "$area"
	mkdir -p "$area/$view_name"
	if [ -d "$area/$view_name/$script_name" ]; then
		rm -r "$area/$view_name/$script_name"
	fi
	
	#mv Playwright-report "$script_name-report"
	cp -r ./playwright-report "$area/$view_name/$script_name-report"
	
#	echo "Press the spacebar to continue..."
#	read -n 1 -s key
#	while [ "$key" != " " ]; do
#		read -n 1 -s key
#	done	
done
