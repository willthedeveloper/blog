---
pageTitle: A metronome using WebAudio and React.js
---
## Tl;dr

The working site is [https://www.beatsperminute.click](https://www.beatsperminute.click).

You can also just click around below to try it out:

<iframe src="https://www.beatsperminute.click" title="Beats Per Minute" height="500px" width="100%"></iframe>

## Much harder than I thought it would be

I thought that this would be a nice opportunity to make a quick little UI in React. And, while the UI was fun and easy, it turned out that making a sound occur at perfect intervals in a web browser is *hard*. I'm going to describe some of the complexity below, but know that I owe much this work to [Chris Wilson's "A Tale Of Two Clocks" article](https://www.html5rocks.com/en/tutorials/audio/scheduling/).

## As easy as `setInterval()`, right?

No. NOOOO. No. A practiced musician will perceive even 10ms of latency, so I needed these clicks to be *precise*.

Unfortunately, things like `setInterval()` and `setTimeout()` aren't all that precise. They run in the same thread that takes care of a million other things like rendering and layout calculation and idontknowwhatelse. So for example, if you found yourself resizing the page like crazy while trying to run the metronome, you'd hear imprecise timing. A metronome should to have rock solid time, and if it doesn't, you should throw a cymbal at it.

<iframe src="https://giphy.com/embed/fSAPjQtwbj0zK" width="100%" height="300px" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

## A more complicated but more robust method

Th WebAudio API gives us a clock that is rock solid. Since it runs in its own thread, it won't be affected by other browser work. If you schedule a sound using the `play()` method and feed it the exact timecode of when you'd like to hear the sound, you can trust that it will play at the right time (or at least, with much lower latency that the previously mentioned method whose name I dare not speak).

So, generally speaking, here's what we do: calculate the timecode for beats to come using the current time and the current bpm, and schedule sounds to occur at those times. You could do this 100 times, and then hear 100 beats occur at the right interval over time.

All done, right?

## What about when the user changes the tempo?

Ah. Here's the problem. If we schdule a bunch of beats at 88 bpm, but then the user decides to change the tempo, now we have a bunch of "stale" beats in our schedule that are still going to play. And typically, a metronome will adjust immediately to a tempo change. This all means that we can't schedule things too far ahead. And unfortunately, that `play()` method doesn't have a callback function that we can use to schedule the next event.

To solve this problem, we need to go back to our old unreliable friend `setTimeout()`. Here's how we use it:
    - Set a timeout that will recur at a regularish interval (again, this is going to be innacurate), pretty much like a one-off `setInterval()`.
    - Every timeout, check the current time of our WebAudio clock, and schedule any beats that should play between now and the next timeout. Again, we know exactly when to schedule those beats by doing some math with the last beat timecode and the current BPM.
    - Because these timeouts might be late, make them overlap with one another in order to account for those errors. Then we can be sure that we never skip a beat.

This way, we don't schedule too many beats in advance, and when we do, the beats reflect the most recent tempo setting.

PS. As I write this, I realized you could do this another way that might be easier. Every time the tempo changes, throw out the schedule and replace with a new one that reflects the new tempo. Schedule 10 beats in advance, hell, make it 100. Seems like that would work too, but I'm probably missing something.

## Making it progressive

Nobody is going to use a browser-based metronome on their phone. It shouldn't need an internet connection to work, and this was my first opportunity to make a progressive web app. Since I built this project on top of [create-react-app](https://create-react-app.dev/), it was absurdly easy to convert it to a PWA. You only need to cache all the resources, but beyond that there was no need for local storage or anything like that.

## Conclusion

This probably would have been easier to do without React, frankly. I had to deal with lifecycle methods and blabla stuff that would have probably been easier to hand roll. But hey, here we are. Hope you enjoyed. Tell your friends.




