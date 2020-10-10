# Scenery
A FoundryVTT module that allows easy import and background image changes for variations such as GM/Player, Night, Seasonal, etc.

![Scenery UI](docs/example.jpg?raw=true "The Scenery UI")

To open the scenery config, right click a scene in either the top scene navigation, or the scenes directory in the sidebar, and select "Scenery".

### Features
- Assign variations to be easily switched between
- Choose a different background to be shown to Players and GM
- Automatically find and import variations

### How to setup variations
When scanning for variations, scenery works as follows:
- Based on the default image of the scene (set in core scene configuration)
- Will only look for variation images in the same directory
- Variation file names must contain the base file name of the default image, minus the extension
- Variation names will have special characters removed and any dashes or underscores converted to spaces

For example, if your default map is `maps/forest-camp/Forest-Camp.jpg`, Scenery will find the following:
- `maps/forest-camp/Forest-Camp-GM.jpg`
- `maps/forest-camp/Forest-Camp2.jpg`
- `maps/forest-camp/2.Forest-Camp.jpg`
- `maps/forest-camp/Forest-Camp-alt.png`
- `maps/forest-camp/Forest-Camp-Night.webp`

Scenery will not consider the following examples to be variations of `maps/forest-camp/Forest-Camp.jpg`:
- `maps/some-other-dir/Forest-Camp-GM.jpg` (is not in same directory)
- `maps/forest-camp/night.jpg` (does not contain base name)
- `maps/forest-camp/forestcamp-night.jpg` (Base name has no exact match in variation name)

Example how to set up your directory:

![Filename Example](docs/variations.jpg?raw=true "Filename Example")

### Questions? Suggestions
Please @vance#1935 on Discord.
