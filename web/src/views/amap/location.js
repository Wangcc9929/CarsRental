let geolocation = null;
export function Selflocation(params) {
    var options = {
        showButton: true, //是否显示定位按钮
        enableHighAccuracy: true,//是否开启高精度匹配
        zoomToAccuracy: true,//定位成功后调整地图视野到定位点
        buttonPosition: "LB", //定位按钮的位置
        /* LT LB RT RB */
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮距离对应角落的距离
        showMarker: true, //是否显示定位点
        markerOptions: {
            //自定义定位点样式，同Marker的Options
            // offset: new AMap.Pixel(-18, -36),
            content: " ",
            // content:
            //   '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>',
        },
        showCircle: true, //是否显示定位精度圈
        circleOptions: {
            //定位精度圈的样式
            strokeColor: "#393e43",
            // noSelect: true,
            strokeOpacity: 0,
            strokeWeight: 1,
            fillColor: "#393e43",
            fillOpacity: 0,
        },
    };
    if (!geolocation) {
        geolocation = new AMap.Geolocation(options);
        params.map.addControl(geolocation);
        geolocation.getCurrentPosition();
        if (params.complete && typeof params.complete == 'function') {
            AMap.event.addListener(geolocation, 'complete', params.complete); //定位成功
        }
        if (params.error && typeof params.error == 'function') {
            AMap.event.addListener(geolocation, 'error', params.error); //定位失败
        }
    };

}
