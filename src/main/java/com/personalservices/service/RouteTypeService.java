package com.personalservices.service;

import com.personalservices.dao.RouteTypeDAO;
import com.personalservices.entity.RouteType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/* Component anotasyonu yönetimli nesne anlamına gelmektedir */
@Component
public class RouteTypeService {

    /* Yönetimli Nesne */
    /*
      *Autowired annotationu bir Bean nin icine uygun tipteki bilgiyi otamatik olarak yüklemekte kullanilir.
    */
    @Autowired
    RouteTypeDAO routeTypeDAO;

    @Transactional
    public List<RouteType> getAll(){
        return routeTypeDAO.findAll();
    }
    @Transactional
    public void persist(RouteType cse){
        routeTypeDAO.save(cse);
    }

    @Transactional
    public void delete(int id){
        routeTypeDAO.delete(routeTypeDAO.findByID(id));
    }

    @Transactional
    public void merge(RouteType cse){
        routeTypeDAO.merge(cse);
    }

    @Transactional
    public RouteType getByID(int id){
        return routeTypeDAO.findByID(id);
    }

}
