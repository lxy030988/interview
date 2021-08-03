const SPORT_MAX_SPEED = 2; // 最大运动时长
let isFirst = 0; // 是否是第一次定位点
let weight1; // 权重点1
let weight2; // 权重点2
let w1TempList = []; // w1的临时定位点集合
let w2TempList = []; // w2的临时定位点集合
let w1Count = 0; // 统计w1Count所统计过的点数

function filterPos(aMapLocation, LngLat) {
  let currentStamp = System.currentTimeMillis() / 1000;
  // let filterString = currentStamp +" :";
  // 获取的第一个定位点不进行过滤
  if (isFirst < 2) {
    isFirst++;
    if (isFirst < 2) {
      // filterString += "第一个定位点 : （容易漂移）不记录，不更新";
      // 测试记录
      weight1 = getLocation(aMapLocation, currentStamp);
      return null;
    }
    let distance = AMapUtils.calculateLineDistance(
      new LatLng(weight1.latitude, weight1.longitude),
      new LatLng(aMapLocation.getLatitude(), aMapLocation.getLongitude())
    );
    weight1 = getLocation(aMapLocation, currentStamp);
    // filterString += "第二个定位点 : 与第一个点的距离："+distance+", 重新开始记录，不更新 ,";
    // 将得到的第一个点存储入w1的缓存集合
    let traceLocation = getLocation(aMapLocation, currentStamp);
    w1TempList.push(traceLocation);
    w1Count++;
    return null;
  } else {
    // filterString += "非第一次" + " : ";
    // 过滤静止时的偏点，在静止时速度小于1米就算做静止状态
    if (weight2 == null) {
      // filterString += "weight2=null" + " : ";
      // 计算w1与当前定位点p1的时间差并得到最大偏移距离D
      let offsetTime = currentStamp - weight1.timestamp;
      if (offsetTime == 0) {
        return null;
      }
      let MaxDistance = offsetTime * SPORT_MAX_SPEED;
      let distance = AMapUtils.calculateLineDistance(
        new LatLng(weight1.latitude, weight1.longitude),
        new LatLng(aMapLocation.getLatitude(), aMapLocation.getLongitude())
      );
      // filterString += "distance=" + distance + ", MaxDistance=" + MaxDistance + " : ";
      if (distance > MaxDistance) {
        // filterString += " distance>MaxDistance" + " 当前点 距离大: 设置w2位新的点，并添加到w2TempList";
        // 将设置w2位新的点，并存储入w2临时缓存
        weight2 = getLocation(aMapLocation, currentStamp);
        w2TempList.add(weight2);
        return null;
      } else {
        // filterString += " distance<MaxDistance" + " 当前点 距离小 : 添加到w1TempList";
        // 将p1加入到做坐标集合w1TempList
        let traceLocation = getLocation(aMapLocation, currentStamp);
        w1TempList.add(traceLocation);
        w1Count++;
        // 更新w1权值点
        weight1.latitude =
          weight1.latitude * 0.2 + aMapLocation.getLatitude() * 0.8;
        weight1.longitude =
          weight1.longitude * 0.2 + aMapLocation.getLongitude() * 0.8;
        weight1.timestamp = currentStamp;

        if (w1Count > 3) {
          // filterString += " : 更新";
          let list = [...w1TempList];
          w1TempList = [];
          return list;
        } else {
          // filterString += " w1Count<3: 不更新";
          return null;
        }
      }
    } else {
      // filterString += "weight2 != null" + " : ";
      // 计算w2与当前定位点p1的时间差并得到最大偏移距离D
      let offsetTimes = currentStamp - weight2.timestamp;
      let MaxDistance = offsetTimes * SPORT_MAX_SPEED;
      let distance = AMapUtils.calculateLineDistance(
        new LatLng(weight2.latitude, weight2.longitude),
        new LatLng(aMapLocation.getLatitude(), aMapLocation.getLongitude())
      );
      // filterString += "distance = " + distance + ",MaxDistance = " + MaxDistance + " : ";
      if (distance > MaxDistance) {
        // filterString += "当前点 距离大: weight2 更新";
        w2TempList = [];
        // 将设置w2位新的点，并存储入w2临时缓存
        weight2 = getLocation(aMapLocation, currentStamp);
        w2TempList.push(weight2);
        return null;
      } else {
        // filterString += "当前点 距离小: 添加到w2TempList";
        // 将p1加入到做坐标集合w2TempList
        let traceLocation = getLocation(aMapLocation, currentStamp);
        w2TempList.add(traceLocation);

        // 更新w2权值点
        weight2.latitude =
          weight2.latitude * 0.2 + aMapLocation.getLatitude() * 0.8;
        weight2.longitude =
          weight2.longitude * 0.2 + aMapLocation.getLongitude() * 0.8;
        weight2.timestamp = currentStamp;
        if (w2TempList.length > 4) {
          let list = [];
          // 判断w1所代表的定位点数是否>4,小于说明w1之前的点为从一开始就有偏移的点
          if (w1Count > 4) {
            // filterString += "w1Count > 4" + "计算增加W1";
            list.addAll(w1TempList);
          } else {
            // filterString += "w1Count < 4" + "计算丢弃W1";
            w1TempList.clear();
          }
          // filterString += "w2TempList.size() > 4" + " : 更新到偏移点";
          // 将w2TempList集合中数据放入finalList中
          list.addAll(w2TempList);
          // 1、清空w2TempList集合 2、更新w1的权值点为w2的值 3、将w2置为null
          w2TempList.clear();
          weight1 = weight2;
          weight2 = null;
          return list;
        } else {
          // filterString += "w2TempList.size() < 4";
          return null;
        }
      }
    }
  }
}
