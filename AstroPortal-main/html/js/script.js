require(["esri/config", "esri/Map", "esri/views/SceneView"], (esriConfig, Map, SceneView, Draw) => {
    esriConfig.apiKey = "AAPK336fb17b604a45a4b807d33c311e188bjAAZv6YFXyiRet2DAuEqw50dArOzUdOqwzsotKpxi8vTEDAhK3HAZO9x4d9B1Pir";
    const map = new Map({
        basemap: "arcgis-imagery-standard",
        ground: "world-elevation"
    });

    const view = new SceneView({
        container: "viewDiv",
        map: map,
        scale: 100000000,
        center: [-101.17, 21.78],
        constraints: {
            altitude: {
                max: 150000000
            }
        },
        popup: {
            dockEnabled: true,
            dockOptions: {
                breakpoint: false
            }
        },
        environment: {
            lighting: {
                type: "virtual"
            }
        }
    });
    const satelliteLayer = new GraphicsLayer();
    const satelliteTracks = new GraphicsLayer();
    map.addMany([satelliteLayer, satelliteTracks]);
    let url = "db.txt"
}); 