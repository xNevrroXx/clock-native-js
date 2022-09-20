function clockList(selectorListWrapper, objActiveTasks) {
    var wrapperListEl = document.querySelector(selectorListWrapper);
    var clockListEl = wrapperListEl.querySelector(".clocks > .active-tasks__list-tasks"), alarmListEl = wrapperListEl.querySelector(".alarms > .active-tasks__list-tasks"), stopwatchListEl = wrapperListEl.querySelector(".stopwatches > .active-tasks__list-tasks"), timerListEl = wrapperListEl.querySelector(".timers > .active-tasks__list-tasks");
    clockListEl.innerHTML = "";
    alarmListEl.innerHTML = "";
    stopwatchListEl.innerHTML = "";
    timerListEl.innerHTML = "";
    for (var typeTask in objActiveTasks) {
        if (Object.hasOwnProperty.call(objActiveTasks, typeTask)) {
            var listIntervals = objActiveTasks[typeTask];
            if (typeTask[0] !== "_") { // вытащить только getter-свойства
                if (!listIntervals || Object.keys(listIntervals).length === 0) {
                    switch (typeTask) {
                        case "clocks": {
                            clockListEl.innerHTML = "list is clear";
                            break;
                        }
                        case "alarms": {
                            alarmListEl.innerHTML = "list is clear";
                            break;
                        }
                        case "timers": {
                            timerListEl.innerHTML = "list is clear";
                            break;
                        }
                        case "stopwatches": {
                            stopwatchListEl.innerHTML = "list is clear";
                            break;
                        }
                        default:
                            break;
                    }
                    continue;
                }
                for (var key in listIntervals) {
                    if (Object.hasOwnProperty.call(listIntervals, key)) {
                        var intervalObjFields = listIntervals[key];
                        var elem = document.createElement("li");
                        elem.innerHTML = "\n                                <div class=\"active-tasks__time\" data-type-task=\"".concat(typeTask, "\" data-interval-id=\"").concat(key, "\">\n").concat(intervalObjFields.time.hours ? intervalObjFields.time.hours : "", ":\n").concat(intervalObjFields.time.minutes).concat(intervalObjFields.time.seconds ? ":\n".concat(intervalObjFields.time.seconds) : "").concat(intervalObjFields.time.milliseconds ? ":\n".concat(intervalObjFields.time.milliseconds) : "", "</div>\n                                <button class=\"button active-tasks__cancel\">cancel</button>\n                        ");
                        switch (typeTask) {
                            case "clocks": {
                                clockListEl.append(elem);
                                break;
                            }
                            case "alarms": {
                                alarmListEl.append(elem);
                                break;
                            }
                            case "timers": {
                                timerListEl.append(elem);
                                break;
                            }
                            case "stopwatches": {
                                stopwatchListEl.append(elem);
                                break;
                            }
                        }
                    }
                }
                // switch (typeTask) {
                //     case "clocks": {
                //         listElems.forEach(elem => clockListEl.append(elem));
                //         break;
                //     }
                //
                //     case "alarms": {
                //         listElems.forEach(elem => alarmListEl.append(elem));
                //
                //         break;
                //     }
                //
                //     case "timers": {
                //         listElems.forEach(elem => timerListEl.append(elem));
                //
                //         break;
                //     }
                //
                //     case "stopwatches": {
                //         listElems.forEach(elem => {
                //             stopwatchListEl.append(elem)
                //         });
                //
                //         break;
                //     }
                //
                //     default:
                //         break;
                // }
            }
        }
    }
}
export default clockList;
