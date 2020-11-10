---
pageTitle: Making the DVD screensaver in Javascript
date: Last Modified
datePosted: 2020-11-04
---
Before I prattle on, here is [the working website](https://dvd-screensaver.surge.sh).

-----

<strong>Remember the DVD screensaver</strong>? And how you'd watch that colorful logo bouncing around the screen, lazily hoping that it would [hit a corner perfectly](https://www.youtube.com/watch?v=QOtuX0jL85Y) as you waited for the sub to fix the the clunky Panasonic TV as he tried to get the movie going in order to finally sedate this roudy bunch of high school juniors?

I made it for the browser. And like so many of my projects, I went ahead and built it before checking to see if anyone had done it before.

[Plenty](https://bouncingdvdlogo.com/). [People](https://dvdscreensaver.online/). [Have](https://santumerino.itch.io/dvd-screensaver-simulator).

But don't leave yet!

I'm proud to say that my screensaver boasts a few features that the competition doesn't:

### Multiple logos

That's right. When you click, they'll come. Try holding down the mouse.

<video src="https://media.giphy.com/media/l4HNje70Q8YNQqzl39/giphy.mp4" type="video/mp4" autoplay loop></video> 

### Collision detection

If we're going to have multiple logos, we may as well have them collide off of each other, right?

That should be easy, right?

![confusing whiteboard](/assets/img/posts/dvd-screensaver/whiteboard.jpg)

Naw.

I knew that I had heard the term "collision detection" before, but I didn't realize that it was the subject of at least one [590-page programming book](https://realtimecollisiondetection.net/).

Initially, I tried to write this from the ground up, thinking about how an object in real life 'knows' when it has collided with something. Then I remembered that there's a thing called "physics" that I *would* have learned about had Mr. Astruc shown up to class that day instead of that poor sub who couldn't get the DVD player working.

#### Finding intersecting rectangles

So, instead of recreating a branch of science on my own, I popped open YouTube. I followed [javidx9's tutorial](https://www.youtube.com/watch?v=8JJ-4JgR7Dg&list=LL&index=5) to detect collisions between moving rectangles.

The algorithm: the animation generates a new frame at least 30 times per second. Every frame, we draw a "ray" from the center of each rectangle along its vector. If that ray intersects another rectangle, then we've found a collision. Easier said than done.

<video src="https://media.giphy.com/media/w12zsAFSay2WK0Jd5F/giphy.mp4" type="video/mp4" autoplay loop></video> 

Honestly, I still don't fully understand the math here. It drift in and out of focus for me depending on how much coffee I've had.

#### Checking a bunch of rectangles

So how do we check every rectangle on screen 30 times per second?
- 🥵 <mark>Inefficient but easy:</mark> check every rectangle against every other rectangle, every frame.
- 🥶 <mark>Efficient but hard:</mark> make an "octree"/"oct tree"/"ostrich"... I don't know what these are.
- 👌 <mark>Just right:</mark><strong> sort 'n' sweep</strong>! Sort the rectangles along their highest variance axis, so that we don't have to check every rectangle against every other rectangle. If we sort rectangles along the x-axis, for example, and rectangle 1 doesn't collide with rectangle 2, then we know for sure it won't collide with rectangle 3 or above, so we can skip all those checks. I followed [@thebennybox's tutorial](https://www.youtube.com/watch?v=bCgF8fzwFvc) to figure this out.

### Controlling time

You can speed things up or slow things down. When you adjust the range control, we update each logo's velocity accordingly.

<video src="https://media.giphy.com/media/oRA9J9rXHvAW1scQ5s/giphy.mp4" type="video/mp4" autoplay loop></video> 

I'm not saying that you can control time. I'm trying to tell you that when you're ready, you won't have to.

### Resizing

You can resize the page and things will still work! Whenever the `"resize"` event fires, we re-initialize the canvas with the window's new dimensions. I didn't need physics class to figure *that* out, HA.

### Other nerdy stuff for nerds

#### Javascript classes

This was a great opportunity to use Javascript `Class`, which I had never used in practice:
- `Point`: just has `x` and `y` props.
    - `Rect`: extends `Point` with width and height, and a bunch of methods.
        - `Logo`: extends `Rect` with image properties.

#### Using a debugger

For this kind of work, a debugger is pretty much essential. Since I am a pathalogical `console.log`-er, this project gave me a great opportunity to become more familiar with VS Code's [Debugger For Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).

#### JSDocs

I wanted to keep things organized, and ended up documenting everything using JSDocs syntax. It's overkill for a fun project like this, but it was a good chance to learn how to write better documentation. [Here are generated docs](https://dvd-screensaver.surge.sh/docs/Logo.html).

_____

OK that's all. Maybe that physics class was useful after all.

Here's the [Github repo](https://github.com/willthefirst/dvd-screensaver).  
Built during my (remote) time at [Recurse Center](www.recurse.com).