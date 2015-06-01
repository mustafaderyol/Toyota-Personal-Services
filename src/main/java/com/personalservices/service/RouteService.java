package com.personalservices.service;

import com.personalservices.dao.RouteDAO;
import com.personalservices.entity.Route;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/* Component anotasyonu yönetimli nesne anlamına gelmektedir */
@Component
public class RouteService {

    /* Yönetimli Nesne */
    /*
      *Autowired annotationu bir Bean nin icine uygun tipteki bilgiyi otamatik olarak yüklemekte kullanilir.
    */
    @Autowired
    RouteDAO routeDAO;

    @Transactional
    public List<Route> getAll(){
        return routeDAO.findAll();
    }
    @Transactional
    public void persist(Route cse){
        routeDAO.save(cse);
    }

    @Transactional
    public void delete(int id){
        routeDAO.delete(routeDAO.findByID(id));
    }

    @Transactional
    public void merge(Route cse){
        routeDAO.merge(cse);
    }

    @Transactional
    public Route getByID(int id){
        return routeDAO.findByID(id);
    }

    @Transactional
    public List<Route> getRouteTypeAndCityToRoute(int city_id, int route_type_id){
        return routeDAO.getRouteTypeAndCityToRoute(city_id,route_type_id);
    }

}
