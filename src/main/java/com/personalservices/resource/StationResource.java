package com.personalservices.resource;

import com.personalservices.entity.Station;
import com.personalservices.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import java.util.List;

/* Component anotasyonu yönetimli nesne anlamına gelmektedir */
@Component
@Path("/station")
public class StationResource {

    /* Yönetimli Nesne */
    /*
      *Autowired annotationu bir Bean nin icine uygun tipteki bilgiyi otamatik olarak yüklemekte kullanilir.
    */
    @Autowired
    private StationService stationService;

    @GET
    @Produces("application/json")
    public List<Station> getStation() {
        return stationService.getAll();
    }

    @GET
    @Path("{id}")
    @Produces("application/json")
    public Station getWithID(@PathParam("id") int id) {
        return stationService.getByID(id);
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
    public Station addStation(Station u) {
        stationService.persist(u);
        return u;
    }


    @PUT
    @Path("{id}")
    @Consumes("application/json")
    @Produces("application/json")
    public Station updateStation(Station u) {
        stationService.merge(u);
        return u;
    }


    @DELETE
    @Path("{id}")
    @Produces("application/json")
    public void removeStation(@PathParam("id") int id) {
        stationService.delete(id);
    }

    @GET
    @Path("/getroutetostation")
    @Produces("application/json")
    public List<Station> getRouteToStation(@QueryParam("route_id") int route_id) {
        return stationService.getRouteToStation(route_id);
    }

}
