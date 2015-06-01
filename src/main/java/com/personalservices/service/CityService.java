package com.personalservices.service;

import java.util.List;

import com.personalservices.dao.CityDAO;
import com.personalservices.entity.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
@Component
public class CityService {

    /* Yönetimli Nesne */
    /*
      *Autowired annotationu bir Bean nin icine uygun tipteki bilgiyi otamatik olarak yüklemekte kullanilir.
    */
    @Autowired
    CityDAO cityDAO;

    @Transactional
    public List<City> getAll(){
        return cityDAO.findAll();
    }
    @Transactional
    public void persist(City cse){
        cityDAO.save(cse);
    }

    @Transactional
    public void delete(int id){
        cityDAO.delete(cityDAO.findByID(id));
    }

    @Transactional
    public void merge(City cse){
        cityDAO.merge(cse);
    }

    @Transactional
    public City getByID(int id){
        return cityDAO.findByID(id);
    }

}
