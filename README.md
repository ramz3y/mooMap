mooMap
======

simple map using mootools
explore large image on a framesimple map using mootools

## getting started
To use mooMap insert an image and create a new mooMap
```` html
<img src="http://www.ezilon.com/maps/images/africa/political-map-of-Togo.gif" id="image_to_map_id" />
<script>
  var myMap = new mooMap($('image_to_map_id'),{width:250,height:600});
</script>
````

## configuration
configuration of mooMap is as simple as:

``` js
 var myMap = new mooMap($('image_to_map_id'),{
    width  : 250,         //  map width
    height : 600,         //  map height
    center : [150,600],   //  map's initial center coordinate
    zoom   : 80           //  map's initial zoom scroll
});
```

##Map methods
### zoomTo
 map.zoomTo(depth)
 Change the zoom to specify `depth`.

``` js

  myMap.zoomTo(50);
```

### centerTo
 map.centerTop(x,y,zoom)
 move the map center to map cordinates `x` and `y` and zoomTo the specify `zoom` .

`````` js
  
  myMap.centerTo(160,300,100);
``````

### centerToElement
 map.centerToElement(el,zoom);
 move to `el`'s coordinates with specify `zoom` .

```` js

  map.centerToElement('pointA',zoom);
````

###addPoint
 map.addPoint('point_name',[x,y]);
 add a point `pointA` to the map at the coordinates `x` and `y`
 
 ```` js
  map.addPoint('pointA',[200,400]);
 ````
 
###bulkAddPoint
 map.bulkAddPoint(object) //{pointName1:[x1,y1], pointName2:[x2,y2]}
 add many point at the same time to the map
 
 * ####Object
 
 ```` js
 points={
        point1 : [x1 , y1] ,
        point2 : [x2 , y1] ,
        point3 : [x3 , y1] ,
        point. : [x. , y.] ,
        point. : [x. , y.] ,
        pointn : [xn , yn] ,
        }
 ````
 
 * #### Example
 
 ```` js
  var points:{
              point1 : [50,400],
              point2 : [300,150],
              point3 : [300,50]
              }
  myMap.bulkAddPoint( points );
 ````
###delPoint
 map.delPoint('point1')
 Remove point `point1` from the map
 
 ```` js
  myMap.delPoint('point1');
 ````
###delAllPoints
 map.delAllPoints()
Remove all points from the map
```` js
  myMap.delAllPoints();
````
