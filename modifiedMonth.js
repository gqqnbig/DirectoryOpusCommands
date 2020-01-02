// Set the script type to JScript to use this script
// The OnInit function is called by Directory Opus to initialize the script add-in
function OnInit(initData) {

    // Provide basic information about the script by initializing the properties of the ScriptInitData object
    initData.name = "Modified Month Column";
    //initData.desc = "Adds a column that indicates if a file has ever been modified.";
    // initData.copyright = "(c) 2014 Jonathan Potter";
    initData.default_enable = true; 
    // Create a new ScriptColumn object and initialize it to add the column to Opus
    var cmd = initData.AddColumn();
    cmd.name = "ModifiedMonth";
    cmd.method = "OnModifiedMonth";
	if(DOpus.language==="chs")
		cmd.label = "修改月份";
	else
		cmd.label = "Modified Month";
		
    cmd.autogroup = false;       // we provide our own grouping information
    cmd.autorefresh = true;      // refresh column when files change
    cmd.justify = "right";
	cmd.type="date";
}

// Implement the IsModified column (this entry point is an OnScriptColumn event).
// The name of this function must correspond to the value specified for the method property when the column was added in OnInit
function OnModifiedMonth(scriptColData) {
   // scriptColData is a ScriptColumnData object. first check that this is the right column (it should be since we only added one)
    if (scriptColData.col != "ModifiedMonth")
        return;

	var d = new Date(scriptColData.item.modify);
	scriptColData.value = d.getFullYear() + "/" + (d.getMonth()+1);
}
