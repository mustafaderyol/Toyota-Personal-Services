package com.personalservices.service;

import com.personalservices.dao.StationDAO;
import com.personalservices.entity.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/* Component anotasyonu yönetimli nesne anlamına gelmektedir */
@Component
public class StationService {

    /* Yönetimli Nesne */
    /*
      *Autowired annotationu bir Bean nin icine uygun tipteki bilgiyi otamatik olarak yüklemekte kullanilir.
    */
    @Autowired
    StationDAO stationDAO;

    @Transactional
    public List<Station> getAll(){
        return stationDAO.findAll();
    }
    @Transactional
    public void persist(Station cse){
        stationDAO.save(cse);
    }

    @Transactional
    public void delete(int id){
        stationDAO.delete(stationDAO.findByID(id));
    }

    @Transactional
    public void merge(Station cse){
        stationDAO.merge(cse);
    }

    @Transactional
    public Station getByID(int id){
        return stationDAO.findByID(id);
    }

    @Transactional
    public List<Station> getRouteToStation(int route_id){
        return stationDAO.getRouteToStation(route_id);
    }
}
