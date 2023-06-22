# A drum set app

## Source
The source code is inspired by https://www.geeksforgeeks.org/design-a-drum-kit-web-app-using-javascript/ and written by Julian Katz (and ChatGPT).

## Bug reports

### Bug #01 Sound plays on key release
If you press a key, the sound should be played immediately. There is a delay if you hold the key. 
#### how to reproduce
Hold a key for a few seconds.
#### how to solve
Find out how events in JavaScript work. What is the right event to solve the problem?
### Bug #02 instrument button style stays after press
If you press any instrument button, the style doesn't change back to the normal state.
#### how to reproduce
press a key or click on a button
#### how to solve
Find out how [classList](https://www.w3schools.com/jsref/prop_element_classlist.asp) works. Remove style a few seconds after button is pressed.

## Tasks
1. Fix all bugs mentioned above.
2. Add another instrument for key 'i'.
3. Allow users to add and remove instruments with new sounds and images.
4. (Optional) Let users adjust the key binding.
5. Allow users to record a song and store it.
6. Each time a song is recorded the tool displays a useless fact. Use [this API](https://uselessfacts.jsph.pl/) to get the facts.