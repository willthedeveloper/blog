---
pageTitle: Remaking the bouncing DVD logo in Javascript
---
Before I prattling on, here is [the working website](dvd-screensaver.surge.sh), if you just want the goods.

OK, so:

Remember the DVD screensaver? How you'd watch that DVD logo bouncing around the screen, as the substitute teacher desperately fiddled with the giant Panasonic box to get a movie going in order to sedate this roudy bunch of high school juniors? And you just sit there, watching, hoping, praying that it would, at some point, [perfectly hit a corner](https://www.youtube.com/watch?v=QOtuX0jL85Y)?

I made it for the browser. And like so many of my projects, I went ahead and built it before checking to see if anybody had done it before.

[Yes](https://bouncingdvdlogo.com/). [People](https://dvdscreensaver.online/). [Have](https://santumerino.itch.io/dvd-screensaver-simulator).

But don't leave yet!

I'm proud to say that my screensaver boasts a few features that the competition doesn't:

### Multiple logos

That's right. Logos will appear wherever you click on screen.

<!-- TODO img -->

### Collision detection

And if we're going to have multiple logos, we may as well have them collide off of each other, right?
That should be easy, right?
Wrong.

<!-- TODO img of stuff falling -->

I knew that I had heard the term "collision detection" before, but I didn't realize that it's the subject of at least one [590-page programming book](https://realtimecollisiondetection.net/).

Initially, my hope was that I could naively write this from the ground up, thinking about how an object in real life 'knows' when it's collided with something. Then I remembered that there is something called "physics" that I *would* have learned about had Mr. Astruc shown up to class that day instead of that poor sub who couldn't get the DVD player working.

#### Finding intersecting triangles

So, instead of recreating a branch of science, I went on YouTube. I followed [javidx9's tutorial](https://www.youtube.com/watch?v=8JJ-4JgR7Dg&list=LL&index=5) to detect collisions between moving rectangles.

The algorithm: the animation generates a new frame at least 30 times per second. Every frame, we draw a "ray" from the center of each rectangle along its vector. If that ray intersects another rectangle, then we've found a collision.

#### Checking a bunch of rectangles

So how do we check every rectangle on screen, every frame?
- 🥵 <mark>Inefficient but easy</mark>: check every rectangle against every other rectangle, every frame.
- 🥶 <mark>Efficient but hard</mark>: make an "octree"/"oct tree"/"ostrich"... I don't know what these are.
- 👌 <mark>Just right</mark>: sort 'n' sweep! Sort the rectangles along their highest variance axis. That way, we don't have to check every rectangle against every other rectangle. I followed [@thebennybox's tutorial](https://www.youtube.com/watch?v=bCgF8fzwFvc) to figure this out.

### Controlling time

You can speed things up or slow things down. When you adjust the knob, we update each logo's velocity.

I'm not saying that you can control time. I'm trying to tell you that when you're ready, you won't have to.

### Resizing

You can resize the page and things will still work! Whenever the `"resize"` event fires, we re-initialize the canvas with the window's new dimensions.

### Nerdy stuff

#### Javascript classes

This was a great opportunity to use Javascript `Class`, which I had never used in practice:
- `Point`: just has `x` and `y` props.
    - `Rect`: extends `Point` with width and height, and a bunch of methods.
        - `Logo`: extends `Rect` with image properties.

#### JSdocs

I wanted to try to keep this thing as organized as possible, and ended up documenting everything using JSdocs syntax. It's overkill for a fun project like this, but still, it was a good chance to learn how to write documentation while working.

OK that's all.

Here's the [Github repo](https://github.com/willthefirst/dvd-screensaver).  
Built during my (remote) time at [Recurse Center](www.recurse.com).