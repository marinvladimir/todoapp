For working GitHub Page, check:
    https://marinvladimir.github.io/todoapp/Todoapp

#README_FILE_FOR_TODO_APP

Desc: 

	ToDo App shows table of all tasks with options such as deleting/editing/creatings tasks.
	Additional option is entering each task individually, where another page is opened with details about the task.
	As an example of that option, two forms have been added to the page: $key (database key for each task) and row (object of table row, JSON format).
	The same approach can be used for adding additional info about the task, such as time_length,place,etc.
	  
Technologies used: 

	Angular CLI, Material, Firebase as database

Installations:

	1.)In wanted folder, access cmd and write the following, for the purpose of installling Angular Environment:
	npm install -g @angular/cli
	2.)Creating App:
	ng new my-dream-app
	3.)Accessing App:
	cd my-dream-app
	4.)Running App locally on localhost port:
	ng serve
	5.)Installation of Material Tool:
	ng add @angular/material
	6.)Firebase installation:
	npm i firebase angularfire2
	
For additional functionalities, the following was added in "app-module.ts":

	-BrowserModule and BrowserAnimationModule (required for Material Component)
	-MaterialModule (created via installation) and ReactiveFormsModule
	-AngularFireModule and AngularFireDatabaseModule were added for accessing Firebase, with initialization added in imports.
	-environment.ts -> in exports, fireBaseConfig was added from the fireBase's snippet, for connection.
	
App in details:

	- Style.css was mainly used for the style. 
	- Main Service File for communication with Database and getting Form, "todoitem.service.ts" was used.
	  For that purpose it's important to add the Firebase modules as an import and also in the constructor.
	- Additional File "material.module.ts" is used as a separate file for imports of Material Components.
	
//////////////todoitem.component.html and ts//////////////

	- Project started with editing Modal window that is gonna appear once the create or edit buttons are clicked.
	  It is using Material's grid style for the html purposes: MatGridListModule,
	  Form and Input: MatFormFieldModule, MatInputModule
	  
	- 2 Buttons: Submit and Cancel,
		ngOnInit() is connected with database for the purpose of monitoring changes via function getTodo()
		Cancel is using (click) function onClear() that clears all form input fields and sets them 
	    in their initializied state.
		Submit is using (click) function onSubmit() and is connected with service, CRUD operation with insertItem() function
		
	- It is also connected to another service called notification.service.ts for the purpose of using another Material API called Snackbar.

//////////////notification.service.ts//////////////		

	Uses SnackBarModule API of Material for giving user notifications about success or failure of the actions (it also uses Config).

//////////////todoitem.service.ts//////////////	  

	List of forms from the FormGroup with explanations:
		$key - important for connecting to database
		id - numerical value, user's input - required field (Validator).
		name - name of the task, any value, required field (Validator).
		description - description of the task, any value, required field (Validator).
		time - time when the task is gonna be done, user's input, restriction: Date-Time format, required field (Validator).
		
	CRUD operations:
	getTodo() is using SnapshotChanges for tracking any changes in the database.
	insertItem() is used for the purpose of pushing any changes to the database.
	updateItem() is used for reflecting any changes with database.
	deleteItem() is used for removing items from the database.
	
//////////////todolist.component.html and ts//////////////	  

	- Purpose of those files are creating a table for the overview of all todo tasks.
	- In html MatTableModule is used for the Table-View.
	- Table needs to have header,rows and bottom, otherwise it will give us an error.
	- From the listData, the array is looped through with the help of the variable instanced in html called "element".
	  Used for getting all the forms in the view: id, name, description and time.
	- MatIconModule is used for icons: delete and edit.
	- NoData is shown in case there aren't any rows.
	- Loading screen is shown in case of delay while gathering info.
	
	- Again todoitem.service is used, for the purpose of getting all the data about the tasks from the database.
	- In ngOnInit() mapping is used through the list for finding the required forms.
	  Item's key is stored as the $key value.
	- Specific object listData was created for the purpose of gaining access to all files via html in a very specific way that TableModule uses.
	  It's calling DataSource for importing all the data, so that's another module required.
	- Additional functionality modules:
		MatSort, added in every header for the purpose of sorting elements (ascending/descending)
		MatPaginator, added for the pagination, it's limited to 5 per page, but it can be edited (additional config dropdown).
		FormField, Search -> added in HTML for the purpose of giving user possibility of searching for a sequence that will show him any items that match.
		Create Button -> when clicked shows a modal window: MatDialog, used for oppening todoitem.component component with some configs.
		Similar approach was used with Edit Modal.
		onEdit() function via button click -> uses PopulateForm for reflecting changes to db - uses Row!
		onDelete() function via button click -> uses $key!, called Deleting function in service.
	
//////////////mat-confirm-dialog.component.html and ts//////////////		
		
	- Uses MatDialogModule
	- in todoItemComponent, DialogService was added for the purpose of enabling MatDialog
	- Was done for the purpose of adding message "Are you sure you want to delete this records?"
	- PopupModule was used for the Popup that appears in case item is deleted.
	Snackbar added additionally.

Further Description Page - DetailedViewComponent:

    - Uses router for routing through the pages: first page(table) path set as /ToDoList , secondary page /Detailed.
      Added <router-outlet> for this to take the effect.
      Navigation applied on the button row that appears next to other buttons, for the full description of items.
    - Very specific way of gathering data from the listData of toDoTable. Stores the needed information in 
      hidden HTML div elements and outputs their innerHTML into DetailedViewComponent's elements.
	- Edit and delete buttons were added. Slightly different approach used than in previous component. Gathers info based
      on row/$key.
    - Back button added, uses simple function that reloads last page.
    
User Guide:

    When entering application you can see the list of all the to-do tasks.
    First column lists all ID's, second column lists all names, third represents description and last one is the time of doing the task.
    Everything is editable just by clicking the edit button "Edit", which is positioned as the column right next to the time.
    There is also "Delete" button for deleting existing tasks next to the "Edit" button. 
    If you click on the last button row called "Detailed", u will be redirected to the "Detailed View" of the task, with all the info it
    consists of.
    A little bit about detailed view: it has its' own delete button for deleting the currently opened task and edit button for editing
    it. There is also "Back" button which redirects you back to the "Table View".
    Now back to the table view: Table has more functionalities, such as pagination which is useable when number of tasks increases above
    5. You can limit pagination to [5,10,25,50,100]. There is also a search engine where you can search for the tasks you wish to find.
    Sorting is also available by clicking the column header, arrow indicated if it's descending or ascending.
     
Possible bugs expected:

    - Routing may require troubleshooting (should be fixed now!)
    - Edit button in detailed view doesn't reflect changes instantly, before backing to tableview. ( workaround )

Last Commit:

	- Did some minor changes with checkboxes, took around 10 additional minutes of work in total.
    - Small css changes + small new feature (added additional database info)
    - Getting the time when task is created, instead of being user-input
    - Reading local time
    - Finalizing, adding style changes
    
In case of running locally:

     - Step 1: git pull <HTTPS/SSH path>
     - Step 2: in case of "An unhandled exception occurred: Could not find module "@angular-devkit/build-angular"",
       use this command in the folder where you did the pull request:
       npm install --save-dev @angular-devkit/build-angular 
     - Step 3: ng serve
       In the future, just use ng serve every time you run it (skip steps 1,2)
    
For working GitHub Page, check:
    https://marinvladimir.github.io/todoapp/Todoapp

