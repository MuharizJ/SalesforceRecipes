echo Enter alias of deployment target...
call sfdx force:org:list
@echo off
set /p targetalias=?

@echo on
rm -rf mdapi_output_dir/

call javac DynamicMetadataConfigurator.java
call java DynamicMetadataConfigurator %targetalias%

call sfdx force:source:convert -d mdapi_output_dir/
call sfdx force:mdapi:deploy -d mdapi_output_dir/ -u %targetalias% --wait 10

echo Running Apex Tests against %targetalias% ...
call sfdx force:apex:test:run -l RunLocalTests -u %targetalias% --wait 5
