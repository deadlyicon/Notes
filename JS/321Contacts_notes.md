# Contact exercise

The goal is to create a simple node app that will print out a series on contacts in a specified manner, like so:

```bash
$ node contacts.js
Loading contact data...
...Finished loading contact data.

All Contacts:
|----------------------+--------------------------------|
| Full Name            | Email Address                  |
|----------------------+--------------------------------|
| Ambrose Scullard     | ascullard6@timesonline.co.uk   |
| Charil Clegg         | cclegge@weibo.com              |
| Conroy Honsch        | chonsch3@sohu.com              |
| Devon Bocking        | dbockingc@comcast.net          |
| Didi Grose           | dgroseh@google.com.hk          |
| Engracia Folger      | efolger2@epa.gov               |
| Karita Bough         | kbough9@angelfire.com          |
| Marguerite Lafayette | mlafayettea@bravesites.com     |
| Mateo Da Costa       | mdacosta5@about.com            |
| Mercy Browncey       | mbrownceyg@yelp.com            |
| Nessi Bywaters       | nbywatersf@shop-pro.jp         |
| Niccolo Spruce       | nsprucei@wordpress.com         |
| Northrop Bauchop     | nbauchopb@pagesperso-orange.fr |
| Pier Waine           | pwaine8@unc.edu                |
| Shaylah Fairney      | sfairney7@stumbleupon.com      |
| Tanny Vibert         | tvibert0@illinois.edu          |
| Tova Myall           | tmyall1@instagram.com          |
| Virgina Cankett      | vcankett4@washington.edu       |
| Willdon Hedley       | whedleyd@purevolume.com        |
| Winston Hixley       | whixleyj@homestead.com         |
|----------------------+--------------------------------|
```

The code below is a solution to that problem,  most of the contacts have been omitted for the readability of this file. Let's look at what is going on in the file.



```javascript
let contactStorage = [];

const addContact = function(firstName, lastName, email) {
  contactStorage.push({
    fullName: firstName + ' ' + lastName,
    email: email,
  });
};
```

Here we are establishing the final array that will hold the contactStorage data, as well as defining the ```addContact``` function. This function will be responsible for putting each piece of the contact data into the array, in the right order. Not that we a creating a ```fullName``` property. This is so we can just ```.fullName``` rather than ```contact.first_name + contact.last_name``` further down the script.

```javascript
const addContacts = function(contacts) {
  console.log('Loading contact data...');

  //sort contacts into alphabetical order
  contacts.sort(function(a,b){
    if (a.first_name < b.first_name) { return -1; }
    if (a.first_name > b.first_name) { return 1; }
    return 0;
  });

  //send contact data to addContact()
  for (var i = 0; i < contacts.length; i++) {
    addContact( contacts[i].first_name, contacts[i].last_name, contacts[i].email);
  }
  console.log('...Finished loading data');
};
```

Here we are defining the addContact function. This function is responsible for two things, sorting the contacts into alphabetical order, as per the specs, and then sending each contact over to our first function ```addContact()``` that we defined above.

To sort the array, we use the javascript ```array.sort``` method with a compare function. The compare function is a neat little thing that makes ```.sort``` viable. If ```a.first_name``` has a letter that comes before ```b.first_name```, as in it's unicode value is less than that of b, we return ```-1```. This is important to ```.sort``` as ```-1```, ```1```, and ```0``` will tell the method where the place the item. In this case, ```-1``` places the item to the left, which is how we get an alphabetical list.

If ```a.first_name``` is greater, then it gets placed on the right. ```return 1```. If they are equal, they stay put.

Lastly for this function we loop through the now ordered contact array and pass each individual contact to addContact() to be added to the final array that we will print from. Speaking of...

```javascript
const printContacts = function() {
  //print the initial lines
  console.log(`All Contacts:
|----------------------+--------------------------------|
| Full Name            | Email Address                  |
|----------------------+--------------------------------|`);

  //adjust the contacts to fit the table, then print the contact
  contactStorage.forEach(function(contact){
    name = contact.fullName;
    email = contact.email;

    if (name.length < 20) {
      name = name + new Array((20 - name.length) +1).join(' ');
    }
    if (email.length < 30) {
      email = email + new Array((30 - email.length) +1).join(' ');
    }

    //print the contacts
    console.log('| ' + name + ' | ' + email + ' |');

  });

  //print the final lines.
  console.log('|----------------------+--------------------------------|');
};
```

For the last function, we start off by printing the initial lines for the table. Next up is a somewhat tricky part.

The length of the names is different and they could be any length. We need a bunch of spaces at the end of each name so when we place the ```|``` to separate the name and email it's nice and even. Same goes for the end of the email string.

To do this, we run a ```.forEach``` method, as it modifies each item as we iterate through the list, no need for a for loop, _yay array methods!_

If the length of the full name of the contact is less than 20 (22 spaces in the row but 2 of them are for whitespace on either side), then that name becomes:

it's same name, + a new array that is (20 - the length of the name) plus 1 for the longest name. This returns an array and we want a string so on assingment we also call ```.join(' ')``` which will join each item of the array into a string, and place a white space between them. *_Boom_*, every name has now exactly the amount of whitespace needed to line up with the center of the table.

We do the same thing for the email value, just with 30 characters as there is more space on that side of the table.

And, at the end of this ```.forEach``` method we print the name with the appropriate ```'|'``` to construct the string.

Lastly, we print the final line.

_Bingo Bango Benchmark_


Below is an example of the kind of contact data that is being passed.

```javascript
addContacts([
  {
    "first_name": "Tanny",
    "last_name": "Vibert",
    "email": "tvibert0@illinois.edu",
  },
  {
    "first_name": "Tova",
    "last_name": "Myall",
    "email": "tmyall1@instagram.com",
  },

])

printContacts()
```


## Refactoring

As per Jared's advice, we have removed the sorting algorithm from the addContacts() so it only runs once, in printContacts().

Also suggested was to create a dynamic way to draw those ```-```s that make up the borders of the table. Let's look at how we did that.

```javascript

const determineLongest = function(array, key){
  let longest = array.map(function(item){
    return item[key].length;
    });

  longest = longest.sort(function(a,b){
    return b - a;
  })[0];

  return longest;
};
```

In order to get this to work were were going to have know the longest fullName and email value in the ```contactStorage``` array. We created a function to take care of this.

1. We return an array of the lengths of the values in the given array. So array and key come in, and then we get an array of lengths from the key value that was passed, either fullName or email.

2. We then take that array and sort it so the largest number is at the top of the array, and we assign that value, index ```[0]``` to our value longest, which is then returned.


```javascript
const printContacts = function() {

  //sort contacts into alphabetical order
  contactStorage.sort(function(a,b){
    if (a.fullName < b.fullName) { return -1; }
    if (a.fullName > b.fullName) { return 1; }
    return 0;
  });

  //determine the length of the longest name
  longestNameLength = determineLongest(contactStorage, 'fullName');
  longestEmailLength = determineLongest(contactStorage, 'email');
```

Note the sorting algorithm is in the ```printContacts()``` function now.

Ok so to determine the longest string in any set of keys, we now call our new function and pass it the array to look at, and the name of the key we are looking for. We do this for both ```fullName``` and ```email.```


```javascript
  //print the initial lines
  console.log('All Contacts:');
  console.log('|' + '-'.repeat(longestNameLength + 2) + '+' + '-'.repeat(longestEmailLength + 2) + '|');
  console.log('| Full Name' + ' '.repeat(longestNameLength - 8) + '| ' + 'Email Address' + ' '.repeat(longestEmailLength - 12) + '|');
  console.log('|' + '-'.repeat(longestNameLength + 2) + '+' + '-'.repeat(longestEmailLength + 2) + '|');

  //adjust the contacts to fit the table, then print the contact
  contactStorage.forEach(function(contact){
    name = contact.fullName;
    email = contact.email;

    console.log('| ' + name + ' '.repeat((longestNameLength - name.length)+1) + '| ' + email + ' '.repeat((longestEmailLength - email.length) +1) + '|');
  });

  //print the final line.
  console.log('|' + '-'.repeat(longestNameLength + 2) + '+' + '-'.repeat(longestEmailLength + 2) + '|');
};
```

Armed with these numbers of how long the longest email and fullName properties are, we now draw the table. Of note we used ```.repeat()```, which will simply repeat the string this method is called on however many times you tell it.

In this case, outside of the first few and last lines, we are able to print each name plus however many spaces the longest name value is, minus the name we are priting, plus 1 for the white space around the start and end of the line. We then do the same for the eamil line.

_boom_








