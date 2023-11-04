-------------FRONT END----------------

First page

list of students with name email enrollmentnum gender hobbies semester result(sent from backend)
edit - comments
delete
filters and sort
reset btn
search btn

Second page

Post req
field list -
	name - only str with space
	email - unique
	enrollmentnum - only number + unique
	gender - radio
	hobbies - checkbox
	semester - dropdown
	paper 1 - number >= 100
	paper 2 - number >= 100
	paper 3 - number >= 100
	result
additional validation p1 + p2 + p3 <= 300
All are mandatory 
After add is finished, show alert with success / failure msg
	
-----------BACK END------------------

DB design

	name - only str with space
	email - unique
	enrollmentnum - only number + unique
	gender - radio
	hobbies - checkbox
	semester - dropdown
	paper 1 - number >= 100
	paper 2 - number >= 100
	paper 3 - number >= 100
	comments 
	
methods

get with advanced filter
post
put 
delete

----------------

Search :

	Name
	Email
	enrollmentnum
	
Sort :
	
	Name,
	Result,
	CreatedAt
	
Filter:
	
	Filter marks less than entered
	Filter marks more than entered
	Filter date more than and less than



