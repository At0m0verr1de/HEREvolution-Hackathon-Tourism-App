import React, { useState } from 'react';

const AskRoute = ({ apikey }) => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [routeData, setRouteData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stopOver, setStopOver] = useState('');
    function calculateAndDisplayRoute(platform) {
        var router = platform.getRoutingService(null, 8),
            routeRequestParams = {
                routingMode: 'fast',
                transportMode: 'car',
                origin: source,
                destination: destination,
                return: 'polyline'
            };
    
        router.calculateRoute(routeRequestParams, function(result) {
            if (result.routes.length) {
                result.routes[0].sections.forEach((section) => {
                    // Decode LineString from the flexible polyline
                    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
    
                    // Create a polyline to display the route:
                    let polyline = new H.map.Polyline(linestring, {
                        style: {
                            lineWidth: 4,
                            strokeColor: 'rgba(0, 128, 255, 0.7)'
                        }
                    });
    
                    // Create markers for the start and end points
                    const startMarker = new H.map.Marker(origin);
                    const endMarker = new H.map.Marker(destination);
    
                    // Create a group to hold route and markers
                    const group = new H.map.Group();
                    group.addObjects([polyline, startMarker, endMarker]);
                    map.addObject(group);
    
                    // Set the map's view to show the entire route
                    map.getViewModel().setLookAtData({
                        bounds: group.getBoundingBox(),
                        padding: {top: 50, right: 50, bottom: 50, left: 50}
                    });
                });
            }
        }, function(error) {
            alert(error.message);
        });
    }
    const fetchRouteData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://router.hereapi.com/v8/routes?transportMode=car&avoid[zoneCategories]=environmental&origin=${source}&destination=${destination}&via=${stopOver}&apikey=${apikey}&return=polyline,olyline,actions,instructions`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
    
            // Assuming the polyline data is located in the response like this: data.routes[0].sections[0].polyline
            // Adjust the path based on the actual response structure
            const polylineData = data.routes[0].sections[0].polyline;
    
            console.log("Full response data:", data); // Log the full response
            console.log("Polyline Data:", polylineData); // Log just the polyline data
    
            // If you want to store the polyline data in your state
            setRouteData(polylineData); // Assuming you want to store just the polyline data, adjust as needed
            onRouteFetched(polylineData); // Propagate the route data up to the parent component

        } catch (error) {
            setError('Error fetching data. Please try again.');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    


    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }
    
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Format the latitude and longitude as a string and set it as the source
                const locationString = `${latitude},${longitude}`;
                setSource(locationString);
            },
            () => {
                setError('Unable to retrieve your location');
            }
        );
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (source && destination) {
            calculateAndDisplayRoute(platform);

            fetchRouteData();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Source:
                    <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
                </label>
                <button type="button" onClick={getCurrentLocation}>Current Location</button>
                <label>
                    Destination:
                    <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
                </label>
                <label>
                    Stop Over:
                    <input type="text" value={stopOver} onChange={(e) => setStopOver(e.target.value)} />
                </label>
                <button type="submit">Get Route</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {routeData && (
                <div>
                    <h2>Route Summary</h2>
                    {/* <p>Duration: {routeData.sections[0].type} meters</p> */}
                    {/* <p>{routeData.sections[0].arrival.time}</p> */}
                </div>
            )}
        </div>
    );
};


export default AskRoute;
