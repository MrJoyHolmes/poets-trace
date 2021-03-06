import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//状态
const state={
  //用户登录信息
  userInfo:JSON.parse(sessionStorage.getItem('userInfo')),
  //所有轨迹信息可视化数据
  traces:[],
  //分作家轨迹数组可视化数据
  poetTraces:[],
  //轨迹表信息
  tracesInfo:[],
  //文人列表
  poets:[],
  //所有作品可视化数据
  poemsData:[],
  //分作家作品可视化数据
  poetsPoems:[],
  //作品表信息
  poemsInfo:[],
  //轨迹与作品模式切换
  mode:'轨迹',
  //文人轨迹坐标点
  poemsPoints:[]

}

//mutations  操作state
const mutations = {
  SAVE_USERINFO(state,userInfo){

    //把用户信息存入本地存储
    sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
    state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

  },

  //所有轨迹信息可视化数据存入
  setTraces (state,tracesData){
    state.traces = []
    state.tracesInfo = []
    tracesData.forEach(function (value) {
      let {startx,starty,endx,endy} = value
      let {作家,朝代,年份,起始点,目的地省,目的地市县} = value
      state.traces.push([[startx,starty],[endx,endy]])
      let traceInfo = {
        作家,
        朝代,
        年份,
        起始点,
        目的地省,
        目的地市县
      }
      state.tracesInfo.push(traceInfo)
    })
  },

  //文人轨迹数组可视化数据存入
  setPTraces (state,tracesData){
    state.poetTraces = []
    state.tracesInfo = []
    state.poemsPoints = []
    tracesData.forEach(function (poet) {
      let poetTrace = []
      poet.forEach(function (value) {
        let {startx,starty,endx,endy} = value
        let {作家,朝代,年份,起始点,目的地省,目的地市县} = value
        poetTrace.push([[startx,starty],[endx,endy]])
        let traceInfo = {
          作家,
          朝代,
          年份,
          起始点,
          目的地省,
          目的地市县
        }
        state.tracesInfo.push(traceInfo)
        let poemsPoint = {
          name:起始点,
          value:[startx, starty]
        }
        if(state.poemsPoints.length == 0){
          state.poemsPoints.push(poemsPoint)
        }
        for(var i = 0; i<state.poemsPoints.length; i++){
          if (poemsPoint.name == state.poemsPoints[i].name){
            break
          }
          if (i == state.poemsPoints.length-1){
            state.poemsPoints.push(poemsPoint)
          }
        }
      })
      state.poetTraces.push(poetTrace)
    })
    console.log(state.poemsPoints)
  },

  //所有作品可视化数据存入
  setPoems(state,poemsData){
    state.poemsData = []
    state.poemsInfo = poemsData
    poemsData.forEach(function (value) {
      state.poemsData.push({
        name: value.地点,
        value: [value.经度,value.纬度,value.count]
      })
    })
  },

  //分作家作品可视化数据存入
  setPPoems(state,poemsData){
    state.poetsPoems = []
    state.poemsInfo = []
    poemsData.forEach(function (value,index) {
      let poetPoems = []
      value.forEach(function (value) {
        poetPoems.push({
          name: value.地点,
          value: [value.经度,value.纬度,value.count]
        })
        state.poemsInfo.push({
          文人: state.poets[index],
          地点: value.地点,
          数量: value.count
        })
      })
      state.poetsPoems.push(poetPoems)
      //console.log(state.poemsInfo)
    })
  },
  //显示数据切换
  changePoets(state,poets){
    state.poets = poets
    console.log(state.poets)
  },

  //显示数据切换
  changeMode(state,newMode){
    state.mode = newMode
    console.log(state.mode)
  }
}

const store = new Vuex.Store({
  state,
  mutations
});

export default store