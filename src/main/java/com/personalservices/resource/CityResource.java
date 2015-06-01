package com.personalservices.resource;

import java.util.List;
import javax.ws.rs.*;

import com.personalservices.entity.City;
import com.personalservices.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/* Component anotasyonu yönetimli nesne anlamına gelmektedir */
@Component
@Path("/city")
public class CityResource {

    /* Yönetimli Nesne */
    /*
      *Autowired annotationu bir Bean nin icine uygun tipteki bilgiyi otamatik olarak yüklemekte kullanilir.
    */
    @Autowired
    private CityService cityService;

    @GET
    @Produces("application/json")
    public List<City> getCity() {
        return cityService.getAll();
    }

    @GET
    @Path("{id}")
    @Produces("application/json")
    public City getWithID(@PathParam("id") int id) {
        return cityService.getByID(id);
    }

    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public City addCity(City u) {
        cityService.persist(u);
        return u;
    }


    @PUT
    @Path("{id}")
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
    public void updateCity(City u) {
        cityService.merge(u);
    }


    @DELETE
    @Path("{id}")
    @Produces("application/json")
    public void removeCity(@PathParam("id") int id) {
        cityService.delete(id);
    }

}
