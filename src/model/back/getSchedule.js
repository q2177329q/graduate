/**
 * Created by quan on 2015/5/5.
 */

var mongoose = require('mongoose');
var sendResp = require('../sendResp');

var classModel = mongoose.model('Class'),
    curriculumModel = mongoose.model('Curriculum'),
    teacherModel = mongoose.model('Teacher');

var classList,
    curriculumList,
    contFlag = true,//是否连上两节
    perDay = 4,//每天有多少节课
    perWeek = 5,//一周上几天
    aWeek = perDay * perWeek,//一周一共有多少节课
    countWeek = 20,//一共有多少周
    start = 0,//从第几周开始排课
    canAWeek = 14,//能排多少节课
    contWeek = 0,//连上几周

    not = 'kj';


module.exports = function(){
    classModel.find(function(err, claList){
        if(err){
            return err
        }

        for( cItemO in claList) {
            (function(cItem){
            cla = claList[cItem];
            if (cla.flag) {
                return ;
            }
            curriculumModel.findOne({
                collegeName: cla.collegeName,
                specialtyName: cla.specialty,
                grade: cla.grade
            }, function (err, cur) {
                console.log(cur.length + ',' + cItem)
                if (err) {
                    return err
                }
                claList[cItem].schedule = [];

//            初始化课表
                for (var i = 0; i < 20; i++) {
                    claList[cItem].schedule[i] = [];

                    for (var j = 0; j < 5; j++) {
                        claList[cItem].schedule[i][j] = [];
                        for (var t = 1; t < 10; t++) {

                            claList[cItem].schedule[i][j][t] = {
                                curriculumId: '',
                                curriculumName: '',
                                teacherId: '',
                                teacherName: '',
                                placeId: '',
                                placeName: ''
                            };
                        }
                    }
                    claList[cItem].schedule[i][0][0] = {
                        flag: false,//本周是否已经满课
                        count: 0, //本周一共有多少节课
                        sFlag: false//是否已经排课
                    }
                }

                //判断从第几周开始排课
                for (var i = 0; i < countWeek; i++) {
                    if (!claList[cItem].schedule[i][0][0].flag) {
                        start = i;
                        break;
                    }
                }

                for (var item = cur.list.length - 1; item >= 0; item--) {
                    var flag = false;//该课程程是否排成功
                    while (!flag) {
                        var rand = Math.floor(Math.random() * aWeek);
                        var day = Math.floor(rand / perDay);//星期几
                        var time = rand % perDay === 0 ? 4 : rand % perDay;//第几节
                        if (!claList[cItem].schedule[start][day][time].curriculumId) {
                            for( var tItem = 0; tItem < cur.list[item].time; tItem++ ){
                                claList[cItem].schedule[start + tItem][0][0].count++;
                                claList[cItem].schedule[start + tItem][day][time].curriculumId = cur.list[item]._id;
                                claList[cItem].schedule[start + tItem][day][time].curriculumName = cur.list[item].name;
                                claList[cItem].schedule[start + tItem][day][time].teacherName = cur.list[item].teacher;
                                claList[cItem].schedule[start + tItem][0][0].flag = claList[cItem].schedule[start].count >= canAWeek ? true : false;
                            }
                            flag = true;

                            //生成一张课表，用于显示
                            claList[cItem].curriculum = claList[cItem].curriculum ? claList[cItem].curriculum : [];
                            claList[cItem].curriculum.push({
                                curriculumName : cur.list[item].name,
                                curriculumId : cur.list[item]._id,
                                start : start,
                                week : day,
                                time : time,
                                cont : cur.list[item].time,
                                place : ''
                            })
                            claList[cItem].markModified('curriculum');


                            //生成一张教师的课表，用于显示查询。
                            (function(cur, item){
                                teacherModel.findOne({
                                    name : cur.list[item].teacher
                                },function(err, tea){
                                    tea.curriculum = tea.curriculum ? tea.curriculum : [];
                                    tea.curriculum.push({
                                        curriculumName : cur.list[item].name,
                                        curriculumId : cur.list[item]._id,
                                        start : start,
                                        week : day,
                                        time : time,
                                        cont : cur.list[item].time,
                                        place : ''
                                    })
                                    tea.markModified('curriculum')
                                    tea.save()
                                })
                            })(cur, item)
                        }
                    }
                }
                claList[cItem].flag = true;
                claList[cItem].markModified('schedule')
                claList[cItem].save(function (err) {
                    if (err) {
                        return console.log(err + 'kjkjk');
                    }
                })
            })

            })(cItemO)
        }
    })
}
