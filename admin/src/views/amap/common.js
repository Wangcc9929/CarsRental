export function getLngLat(e){
    return {
        lng:e.lnglat.getLng(),
        lat:e.lnglat.getLat(),
    }
}
let marker=null
export function amapsetMarker(lnglat,map){
    if(marker){
        map.remove(marker);
        marker=null;
    }
    marker = new AMap.Marker({
        position: [lnglat.lng, lnglat.lat]
    });
    map.add(marker);
    map.setFitView();
}
export function cityToMap(address,map){
    var geocoder = new AMap.Geocoder();
    geocoder.getLocation(address, function(status, result) {
        if (status === 'complete'&&result.geocodes.length) {
            let lng = result.geocodes[0].location.lng;
            let lat = result.geocodes[0].location.lat;
            map.setCenter([lng,lat]);
        }else{
            log.error('根据地址查询位置失败');
        }
    });
}
export function amapclearMarker(map){
    if(marker){
        map.remove(marker);
        marker=null;
    }
}
export function destroyMap(map) {
    map&&map.destroy();
}