var mooMap= new Class({
	implements:[Fx.Element],
	options:{
		width:400,
		height:300,
		zoom:100,
		isMobile:false,
	},
	initialize : function(el,options){ // initialize map elements
		if(options!=undefined){
			this.options.width = options.width!=undefined ? options.width : this.options.width;
			this.options.height = options.height!=undefined ? options.height : this.options.height;
			this.options.isMobile = options.isMobile!=undefined ? options.isMobile : false;
			this.options.zoom = options.zoom!=undefined ? options.zoom : this.options.zoom;
			this.options.center = (options.center!=undefined && options.center[0] && options.center[1]) ? options.center : [(parseInt(el.getStyle('width'))/2),(parseInt(el.getStyle('width'))/2)];
			
		}
			console.log(this.options.center);
			this.M={} ;//MAP infos
			this.M.id = el.get('id');
			this.M.w = w = parseInt(el.getStyle('width'));
			this.M.h = h = h=parseInt(el.getStyle('height'));
			Zw=Math.round(100*this.options.width/w)+2
			Zh=Math.round(100*this.options.height/h)+2
			
		this.options.mZ = Zh>Zw ? Zh : Zw 
		this.attach();
		return this;
	 },
	attach : function(){ //create map frame and buttons
		 w=new Element('<div>',{ id:this.M.id+'-wrapper', class:'mapZ' }).setStyles({
			'width' :this.options.width,
			'height' : this.options.height
		 });
		
		d=new Element('<div>',{ id:this.M.id+'-dragger' }).setStyles({
			'position':'absolute',
			'top':-(((this.M.h)/2)-(this.options.height/2))+'px',
			'left':-(((this.M.w)/2)-(this.options.width/2))+'px',
			'width':this.M.w,
			'height':this.M.h
		})//.set('morph', { duration: 200 });
		
		imag=$(this.M.id);
		imag.setStyles({
			height:'100%',
			width:'100%'
		})
		
			
		w.replaces(imag);
		d.adopt(imag);
		w.adopt(d);
		// Add Buttons
		this.addbuttons();
		this.makeDraggable();
		
		var centerpoint=new Element('<div>',{
			id:this.M.id+'-center',
			class:'point',
			styles:{
				'top':this.options.center[0],
				'left':this.options.center[1],
				'border':'0px'
			}
		}).inject(d);
		var crthis=this;
		//this.recenter();
		//(function(){cr
		this.remap(100,$(crthis.M.id+'-dragger'));
		//}).delay(500);
		
	},
	addbuttons:function(){ // add Zoom buttons
		var crthis=this;
		btp=new Element('<a>',{ 
			id:this.M.id+'-btp',
			text:'+',
			class:'zmbt',
			href:'#',
			events:{
				'click':function(e){
					oz=crthis.options.zoom
					if(crthis.options.zoom<200){
						crthis.options.zoom+=10
						if(crthis.options.zoom>200){
							crthis.options.zoom=200
						}
					}
					crthis.remap(oz,$(crthis.M.id+'-dragger'));  
				}
			}
		 }).inject(w);
		
		za=new Element('<div>',{ 
			id:this.M.id+'-zm',
			text:'100',
			class:'zmbt',
			style:'margin-top:100px;border:0px; font-size:12px;padding:5px 2px 0px'
	     }).inject(w);
		
		btm=new Element('<a>',{ 
        id:this.M.id+'-btm',
        text:'-',
        class:'zmbt',
        style:'margin-top:200px',
        href:'#',
        events:{
            'click':function(e){
                oz=crthis.options.zoom;
                if(crthis.options.zoom>crthis.options.mZ){
                    crthis.options.zoom-=10
                    if(crthis.options.zoom<crthis.options.mZ){
                        crthis.options.zoom=crthis.options.mZ
                    }
                }
               crthis.remap(oz,$(crthis.M.id+'-dragger'));
            }
        }
  	   }).inject(w);
	},
	makeDraggable:function(){   //make the map draggable
		var crthis=this
		new Drag.Move(
        $(this.M.id+'-dragger'),
			{onDrag:function(el,e){
				crthis.recenter();
				crthis.ajust($(el.id));
				}
			}
    	);
	   },
	recenter : function(){  //calcul current view center
                ctpT=Math.abs(parseInt($(this.M.id+'-dragger').getStyle('top')))+parseInt($(this.M.id+'-wrapper').getStyle('height'))/2;
                ctpL=Math.abs(parseInt($(this.M.id+'-dragger').getStyle('left')))+parseInt($(this.M.id+'-wrapper').getStyle('width'))/2;
                $(this.M.id+'-center').setStyles({
                    'top':ctpT+'px',
                    'left':ctpL+'px'
                });
      },
	remap : function(oz,el){  //calcul next move position && size
           np=$(this.M.id+'-center').getStyles('top','left');
           ws=$(this.M.id+'-wrapper').getStyles('width','height');
           ntp=Math.abs((parseInt(np.top)*100/oz)*(this.options.zoom/100))-(parseInt(ws.height)/2);
           nlp=Math.abs((parseInt(np.left)*100/oz)*(this.options.zoom/100))-(parseInt(ws.width)/2);
           modif={
               'top' : -ntp,
               'left' : -nlp,
               'height' : this.M.h*this.options.zoom/100,
               'width' : this.M.w*this.options.zoom/100
           };
        this.ajust(el,modif);
		var crthis=this;
        (function(){ crthis.recenter(); }).delay(1200);
     },
	ajust : function(el,modif){ // move map to the correct position
		$(this.M.id+'-zm').set('text',this.options.zoom);
		
		cc=modif!=undefined ? modif : el.getCoordinates();
		ccp=$(el.id).getParent().getCoordinates();
		minTop=-cc.height+ccp.height;
		minLeft=-cc.width+ccp.width;
		rec=cc;
		
		if(cc.left>0){
			rec['left']='0px';
		}
		if(cc.top>0){
			rec['top']='0px';
		}
		if(cc.left<minLeft){
			rec['left']=minLeft+'px';
		}
		if(cc.top<minTop){
			rec['top']=minTop+'px';
		}
		if(modif!=undefined){
			if(rec!={}){
				el.morph(rec);
			}
		}else{
			if(rec!={}){
				el.setStyles(rec);
			}
		}
  },
	addPoint:function(elName,coor){ //Add point
	var crthis=this
		p=new Element('div>',{
			id:this.M.id+'-'+elName,
			class:'points',
			styles:{
				'left':(coor[0]/this.M.w)*100+'%',
				'top':(coor[1]/this.M.h)*100+'%'
			},
			events:{'click':function(el){
						crthis.centerToPoint((el.target.get('id')).substring(-3),100);
					}
				}
			}).inject($(this.M.id+'-dragger'));
	},
	bulkAddPoint:function(els){ //Bulk add point
		var crthis=this;
		Object.each(els,function(coor,el){
			crthis.addPoint(el,coor);
		});
	},
	delPoint:function(el){ //remove point
			element=$(this.M.id+'-dragger').getElementById(this.M.id+'-'+el);
			if(element!=undefined){
				element.destroy();
				return true
			}
			return false
	
		
	},
	delAllPoints:function(){ //Remove all points from the map
		$(this.M.id+'-dragger').getElements('div.points').destroy();
	},
	centerTo:function(x,y,zoom){ //set map center
		oz=this.options.zoom
		$(this.M.id+'-center').setStyles({'left':x,'top':y});
		this.options.zoom= zoom!=undefined  ? zoom : this.options.zoom;
		this.remap(oz,$(this.M.id+'-dragger'));
	},
	centerToElement:function(el,zoom){ //center map to element coordinates
		
			elFel=$(this.M.id+'-dragger').getElementById(this.M.id+'-'+el)
			elFid=$(this.M.id+'-dragger').getElementById(el);
			element=(elFid!=undefined) ? elFid:elFel;
			
		coord=element.getStyles('left','top');
		coor=[Math.round(parseInt(coord['left'])*parseInt($(this.M.id+'-dragger').getStyle('width'))/100),Math.round(parseInt(coord['top'])*parseInt($(this.M.id+'-dragger').getStyle('height'))/100)];
		zoom=zoom!=undefined ? zoom : this.options.zoom;
		this.centerTo(coor[0],coor[1],zoom);
		
	},
	zoomTo:function(zoom){ //to Zoom %
		oz=this.options.zoom;
		this.options.zoom=zoom;
		this.remap(oZ,$(this.M.id+'dragger'));
	}
	,
	detach : function(){ // Detach map
		imag=$(this.M.id)
		imag.erase('style')
		w=$(this.M.id+'-wrapper')
		imag.replaces(w);
	}
 
});
