package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.entity.Continents;
import com._cn4.nhom12.entity.Country;
import com._cn4.nhom12.repository.ContinentsRepo;
import com._cn4.nhom12.services.ContinentsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ContinentsServiceImpl implements ContinentsService {

    private ContinentsRepo continentsRepo;

    private void setValueDtos(Continents entity, Continents request) {
        if (!Objects.isNull(request.getId())) {

            entity.setId(request.getId());
        }
        entity.setName(request.getName());
        if(Objects.nonNull(request.getCountries()) && Objects.nonNull(entity.getId())) {
            entity.setCountries(request.getCountries());
        }
    }

    @Override
    public List<Continents> getAllContinents() {
        return continentsRepo.findAll();
    }


    @Override
    public ResponseEntity<Continents> createContinents(Continents request) {
        Continents entity = new Continents();

        this.setValueDtos(entity, request);

        continentsRepo.save(entity);
        return new ResponseEntity<>(continentsRepo.save(entity), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Continents> getContinents(String id) {

        Optional<Continents> itemExist = continentsRepo.findById(id);
        Continents entity = itemExist.get();

        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Continents> updateContinents(Continents request) {
        Optional<Continents> itemExist = continentsRepo.findById(request.getId());
        Continents entity = itemExist.get();
        this.setValueDtos(entity, request);
        continentsRepo.save(entity);
        return new ResponseEntity<>(continentsRepo.save(entity), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteContinents(String id) {
        continentsRepo.deleteById(id);
        return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
    }

}
