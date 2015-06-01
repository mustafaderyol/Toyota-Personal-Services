package com.personalservices.service;

import com.personalservices.dao.SysadmUserDAO;
import com.personalservices.entity.SysadmUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/* Component anotasyonu yönetimli nesne anlamına gelmektedir */
@Component
public class SysadmUserService {

    /* Yönetimli Nesne */
    /*
      *Autowired annotationu bir Bean nin icine uygun tipteki bilgiyi otamatik olarak yüklemekte kullanilir.
    */
    @Autowired
    SysadmUserDAO sysadmUserDAO;

    @Transactional
    public List<SysadmUser> getAll(){
        return sysadmUserDAO.findAll();
    }
    @Transactional
    public void persist(SysadmUser cse){
        sysadmUserDAO.save(cse);
    }

    @Transactional
    public void delete(int id){
        sysadmUserDAO.delete(sysadmUserDAO.findByID(id));
    }

    @Transactional
    public void merge(SysadmUser cse){
        sysadmUserDAO.merge(cse);
    }

    @Transactional
    public SysadmUser getByID(int id){
        return sysadmUserDAO.findByID(id);
    }
    @Transactional
    public SysadmUser checkLogin(String name,String password) {
        return sysadmUserDAO.checkLogin(name, password);
    }

}
