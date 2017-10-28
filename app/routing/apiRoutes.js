var friendsArray = require("../data/friends");





module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

 app.get("/api/friends", function(req, res) {
  		res.json(friendsData);
  	});

  	// API POST Requests
  	// When a user submits valid survey data:
  	//		The best match is computed based on scores to each answer (this is the 'secret sauce' of the solution).
  	//		Add the person who filled out the survey into the "database" array.
  	//		Return the name and picture of the person who's scores are the best match.
	// -----------------------------------------------------------------------------------------------------------

	app.post("/api/friends", function(req, res) {

		console.log(req.body);

		// User who just completed the survey to find a new friend
		var friendSeeker = req.body;

		// Stores the friend object that is best match. 
		// *Need to add code in case more than one person has same score*
		var bestMatch = {};

		// Loop through the 'scores' array of the user who just completed the survey and 
		// return an integer (1 - 5) that corresponds to the string value of the answer.
		for(var i = 0; i < friendSeeker.scores.length; i++) {

			if(friendSeeker.scores[i] == "1 (Strongly Disagree)") {
				friendSeeker.scores[i] = 1;

			} else if(friendSeeker.scores[i] == "5 (Strongly Agree)") {
				friendSeeker.scores[i] = 5;

			} else {
				friendSeeker.scores[i] = parseInt(friendSeeker.scores[i]);
			}
		}

		// Compare the difference between current user's scores against those from other users, question by question.
		// Add up the differences to calculate the `totalDifference`.

		// Store the index of the user who's the 'current' best match as we loop through the friend array computing compatibility.
		var bestMatchIndex = 0;

		// The biggest possible difference in values between the answers from two users is '4'(=5-1).
		// There are 10 questions so the greatest possible difference is '40' (not compatible!).
		var bestMatchDifference = 40;

		// Start loop through the array of users in the 'database'
		for(var i = 0; i < friendsArray.length; i++) {

			// Set the initial 'difference' between two corresponding answers to '0'
			var totalDifference = 0;

			// Start a second loop through the currently indexed user's answers
			for(var index = 0; index < friendsArray[i].scores.length; index++) {

				// Calculate the difference between the indexed user's answer and the friendSeeker's answer to the same question
				var scoreDifference = Math.abs(friendsArray[i].scores[index] - friendSeeker.scores[index]);

				// Keep a running total of the differences between answer scores
				totalDifference += scoreDifference;

			} // End of second loop through the currently indexed user's answers.


        	// If the totalDifference in scores is less than the best match so far then save that index and difference.
        	// (This is why an 'upper boundry' of '40' was set.)
        	// Then go get next user if one exists in array
        	if (totalDifference < bestMatchDifference) {
        		bestMatchIndex = i;
        		bestMatchDifference = totalDifference;
        	}

        } // End of loop through the array of users

        // Store the index of the user who's the 'current' best match to variable so we can request data from the friendsArray
        bestMatch = friendsArray[bestMatchIndex];

        // Add the user who just completed the survey in "database" array
        friendsArray.push(friendSeeker);

        // Return the best match friend
        res.json(bestMatch);

	}); // End of POST api route

 }; // End of export function.