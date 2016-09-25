import React from 'react';

var GameBoard = React.createClass({
    getInitialState : function(){
        return {
            gameState : 0,
            heroLoc : 0,
            aniEnd: true,
            enemyLoc: 2,
            enemyLevel: 1,
            kic: 0
        }
    },
    gameStart : function(){
      this.setState({
        gameState : 1,
        kic: 0
      });
      this.createEnemy();
      this.gameTick();
    },
    gameHandle : function(e){
        if(this.state.gameState ==1){
            switch(e.keyCode){
                case 37:
                    this.setState({heroLoc : 0});
                    break;
                case 39:
                    this.setState({heroLoc : 1});
                    break;
            }
        }
        console.log(this.state.heroLoc);
        console.log(this.state.enemyLoc);
    },
    createEnemy: function() {
    	var that = this;
    	var dis;
    	var h = document.body.clientHeight;
    	that.setState({
    		enemyLoc: Math.floor(Math.random()*2)
    	});
    	setInterval(function() {
    		
				dis = parseInt(window.getComputedStyle(that.refs.enemy,null).getPropertyValue("top"));
    		
    		if(that.state.gameState == 1 && that.state.kic <= 1000){
    			that.setState({
    				kic: that.state.kic+1,
    				enemyLevel: 1
    			});
    			//距离大于屏幕高度时产生随机敌车
    			if(dis > h-1) {
	    			that.setState({
	    				enemyLoc: Math.floor(Math.random()*2)
	    			});
	    		}
    		}

				if(that.state.gameState == 1 && that.state.kic > 1000 && that.state.kic <=4000){
    			that.setState({
    				kic: that.state.kic+2,
    				enemyLevel: 2
    			});
    			//距离大于屏幕高度时产生随机敌车
    			if(dis > h-1) {
	    			that.setState({
	    				enemyLoc: Math.floor(Math.random()*2)
	    			});
	    		}
    		}
    		if(that.state.gameState == 1 && that.state.kic > 4000){
    			that.setState({
    				kic: that.state.kic+4,
    				enemyLevel: 3
    			});
    			//距离大于屏幕高度时产生随机敌车
    			if(dis > h-1) {
	    			that.setState({
	    				enemyLoc: Math.floor(Math.random()*2)
	    			});
	    		}
    		}
    	},1);
    },
    gameTick: function() {
    	var that = this;
    	var dis;
    	var h = document.body.clientHeight;
    	// if(this.state.heroLoc == this.state.enemyLoc && ) {}
    	setInterval(function(){
    		dis = parseInt(window.getComputedStyle(that.refs.enemy,null).getPropertyValue("top"));
    		if(dis>(h-300) && dis< h-200 &&that.state.heroLoc==that.state.enemyLoc) {
    			that.setState({
    				gameState: 0,
    				enemyLoc: 2
    			});
    		}
    	},1);
    },
  //监听键盘事件
  componentDidMount:function(){
    window.addEventListener("keydown", this.gameHandle, false);
  },
	render: function() {
		return <div className="board">
				<div className="kic">{this.state.kic}m</div>
				<div className={this.state.gameState==0?"roadbed":"roadbed runStart"}></div>
				<div className="road">
					<div className={this.state.heroLoc==0?"hero left":"hero right"}></div>
					<div className={"enemyCls p"+this.state.enemyLoc+this.state.enemyLevel} ref="enemy"></div>
				</div>		
				<a className={this.state.gameState==0?"start":"start hide"} onClick={this.gameStart} ></a>
			</div>
	}
});

export default GameBoard;