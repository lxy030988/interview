const SPORT_MAX_SPEED = 1.5; // 最大运动时长
let isFirst = true; // 是否是第一次定位点
let weight1; // 权重点1
let weight2; // 权重点2
let w1TempList = []; // w1的临时定位点集合
let w2TempList = []; // w2的临时定位点集合
let w1Count = 0; // 统计w1Count所统计过的点数
// let MaxDistance = 50; //最大偏移距离
let mListPoint = [];

let LngLat;
function formatPoints(points, ll) {
  LngLat = ll;
  let newPoints = [];
  for (let i = 0; i < points.length; i++) {
    if (filterPos(points[i])) {
      newPoints.push(points[i]);
    }
  }
  return newPoints;
}
// la: "31.947012769775572"
// ln: "118.53844920788508"
// oi: "55350966249062400"
// on: "桥林街道"
// s: "0.0"
// t: 1607011201073
// u: "97763969288110080"
function filterPos(point) {
  let filterString = "";

  try {
    // 获取的第一个定位点不进行过滤
    if (isFirst) {
      isFirst = false;
      filterString += "第一次 : ";
      // 将得到的第一个点存储入w1的缓存集合
      weight1 = point;
      w1TempList.push(weight1);
      w1Count++;
      return true;
    } else {
      filterString += "非第一次 : ";
      if (weight2 == null) {
        filterString += "weight2=null : ";
        // 计算w1与当前定位点p1的时间差并得到最大偏移距离D
        let offsetTimeMils = point.t - weight1.t;
        let offsetTimes = offsetTimeMils / 1000;
        let MaxDistance = offsetTimes * SPORT_MAX_SPEED;

        let distance = new LngLat(weight1.ln, weight1.la).distance(
          new LngLat(point.ln, point.la)
        );
        filterString += `distance = ${distance},MaxDistance = ${MaxDistance} : `;

        if (
          distance > MaxDistance ||
          distance > 50 ||
          MaxDistance - distance > 100
        ) {
          filterString +=
            "distance > MaxDistance当前点 距离大: 设置w2位新的点，并添加到w2TempList";
          // 将设置w2位新的点，并存储入w2临时缓存
          weight2 = point;
          w2TempList.push(weight2);
          return false;
        } else {
          filterString +=
            "distance < MaxDistance当前点 距离小 : 添加到w1TempList";
          // 将p1加入到做坐标集合w1TempList
          w1TempList.push(point);
          w1Count++;
          // 更新w1权值点
          weight1 = {
            ...point,
            la: weight1.la * 0.2 + point.la * 0.8,
            ln: weight1.ln * 0.2 + point.ln * 0.8,
          };

          if (w1Count > 3) {
            filterString += " : 更新";
            mListPoint.push(...w1TempList);
            w1TempList = [];
            return true;
          } else {
            filterString += " w1Count<3: 不更新";
            return false;
          }
        }
      } else {
        filterString += "weight2 != null : ";
        // 计算w2与当前定位点p1的时间差并得到最大偏移距离D
        let offsetTimeMils = point.t - weight2.t;
        let offsetTimes = offsetTimeMils / 1000;
        let MaxDistance = offsetTimes * 1;

        let distance = new LngLat(weight2.ln, weight2.la).distance(
          new LngLat(point.ln, point.la)
        );
        filterString += `distance = ${distance},MaxDistance = ${MaxDistance} : `;

        if (
          distance > MaxDistance ||
          distance > 50 ||
          MaxDistance - distance > 100
        ) {
          filterString += "当前点 距离大: weight2 更新";
          w2TempList = [];
          // 将设置w2位新的点，并存储入w2临时缓存
          weight2 = point;
          w2TempList.push(weight2);

          return false;
        } else {
          filterString += "当前点 距离小: 添加到w2TempList";

          // 将p1加入到做坐标集合w2TempList
          w2TempList.push(point);

          // 更新w2权值点
          weight2 = {
            ...point,
            la: weight2.la * 0.2 + point.la * 0.8,
            ln: weight2.ln * 0.2 + point.ln * 0.8,
          };

          if (w2TempList.length > 4) {
            // 判断w1所代表的定位点数是否>4,小于说明w1之前的点为从一开始就有偏移的点
            if (w1Count > 4) {
              filterString += "w1Count > 4计算增加W1";
              mListPoint.push(...w1TempList);
            } else {
              filterString += "w1Count < 4计算丢弃W1";
              w1TempList = [];
            }
            filterString += "w2TempList.length > 4 : 更新到偏移点";

            // 将w2TempList集合中数据放入finalList中
            mListPoint.push(...w2TempList);

            // 1、清空w2TempList集合 2、更新w1的权值点为w2的值 3、将w2置为null
            w2TempList = [];
            weight1 = weight2;
            weight2 = null;
            return true;
          } else {
            filterString += "w2TempList.length < 4\r\n";
            return false;
          }
        }
      }
    }
  } finally {
    console.log(filterString);
  }
}

export { formatPoints };
