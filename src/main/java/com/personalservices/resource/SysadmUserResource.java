package com.personalservices.resource;

import com.personalservices.entity.SysadmUser;
import com.personalservices.service.SysadmUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import java.util.List;

/* Component anotasyonu yönetimli nesne anlamına gelmektedir */
@Component
@Path("/sysadmuser")
public class SysadmUserResource {

    /* Yönetimli Nesne */
    /*
      *Autowired annotationu bir Bean nin icine uygun tipteki bilgiyi otamatik olarak yüklemekte kullanilir.
    */
    @Autowired
    private SysadmUserService sysadmUserService;

    @GET
    @Produces("application/json")
    public List<SysadmUser> getSysadmUser() {
        return sysadmUserService.getAll();
    }

    //userId'ye göre arama yapmak için parametreler alınıyor
    @GET
    @Path("{id}")
    @Produces("application/json")
    public SysadmUser getWithID(@PathParam("id") int id) {
        return sysadmUserService.getByID(id);
    }

    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public SysadmUser persist(SysadmUser u) {
        sysadmUserService.persist(u);
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
    public SysadmUser update(SysadmUser u) {
        sysadmUserService.merge(u);
        return u;
    }


    @GET
    @Path("login")
    @Produces("application/json")
    public SysadmUser checkLogin(@QueryParam("username") String username, @QueryParam("password") String password ) {
        return sysadmUserService.checkLogin(username,password);
    }



    @DELETE
    @Path("{id}")
    @Produces("application/json")
    public void remove(@PathParam("id") int id) {
        sysadmUserService.delete(id);
    }

}
