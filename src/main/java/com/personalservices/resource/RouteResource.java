package com.personalservices.resource;

import com.personalservices.entity.Route;
import com.personalservices.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import java.util.List;

/* Component anotasyonu yönetimli nesne anlamına gelmektedir */
@Component
@Path("/route")
public class RouteResource {

    /* Yönetimli Nesne */
    /*
      *Autowired annotationu bir Bean nin icine uygun tipteki bilgiyi otamatik olarak yüklemekte kullanilir.
    */
    @Autowired
    private RouteService routeService;

    @GET
    @Produces("application/json")
    public List<Route> getRoute() {
        return routeService.getAll();
    }

    @GET
    @Path("{id}")
    @Produces("application/json")
    public Route getWithID(@PathParam("id") int id) {
        return routeService.getByID(id);
    }

    @POST
    /*
        **Consumes Anotasyonu
    Client ın server a göndereceği verinin tipini belirtir
    * */
    @Consumes("application/json")
    /*
        **Produces Anotasyonu
    Server ın bize döndüreceği değerin tipi
    * */
    @Produces("application/json")
    public Route addRoute(Route u) {
        routeService.persist(u);
        return u;
    }


    @PUT
    @Path("{id}")
    @Consumes("application/json")
    @Produces("application/json")
    public Route updateRoute(Route u) {
        routeService.merge(u);
        return u;
    }


    @DELETE
    @Path("{id}")
    @Produces("application/json")
    public void removeRoute(@PathParam("id") int id) {
        routeService.delete(id);
    }

    @GET
    @Path("/getroutetypeandcitytoroute")
    @Produces("application/json")
    public List<Route> getRouteTypeAndCityToRoute(@QueryParam("city_id") int city_id,@QueryParam("route_type_id") int route_type_id) {
        return routeService.getRouteTypeAndCityToRoute(city_id,route_type_id);
    }

}
