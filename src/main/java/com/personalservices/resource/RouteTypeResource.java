package com.personalservices.resource;

import com.personalservices.entity.RouteType;
import com.personalservices.service.RouteTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import java.util.List;

/* Component anotasyonu yönetimli nesne anlamına gelmektedir */
@Component
@Path("/routetype")
public class RouteTypeResource {

    /* Yönetimli Nesne */
    /*
      *Autowired annotationu bir Bean nin icine uygun tipteki bilgiyi otamatik olarak yüklemekte kullanilir.
    */
    @Autowired
    private RouteTypeService routeTypeService;

    @GET
    @Produces("application/json")
    public List<RouteType> getRouteType() {
        return routeTypeService.getAll();
    }

    @GET
    @Path("{id}")
    @Produces("application/json")
    public RouteType getWithID(@PathParam("id") int id) {
        return routeTypeService.getByID(id);
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
    public RouteType addRouteType(RouteType u) {
        routeTypeService.persist(u);
        return u;
    }


    @PUT
    @Path("{id}")
    @Consumes("application/json")
    @Produces("application/json")
    public RouteType updateRouteType(RouteType u) {
        routeTypeService.merge(u);
        return u;
    }


    @DELETE
    @Path("{id}")
    @Produces("application/json")
    public void removeRouteType(@PathParam("id") int id) {
        routeTypeService.delete(id);
    }

}
