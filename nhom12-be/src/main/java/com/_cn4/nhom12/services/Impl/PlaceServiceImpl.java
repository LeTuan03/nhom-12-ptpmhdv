package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.DTO.request.PlaceRequest;
import com._cn4.nhom12.entity.Account;
import com._cn4.nhom12.entity.Booking;
import com._cn4.nhom12.entity.Destination;
import com._cn4.nhom12.entity.Place;
import com._cn4.nhom12.repository.AccountRepo;
import com._cn4.nhom12.repository.BookingRepo;
import com._cn4.nhom12.repository.DestinationRepo;
import com._cn4.nhom12.repository.PlaceRepo;
import com._cn4.nhom12.services.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.*;

@Service
public class PlaceServiceImpl implements PlaceService {

    @Autowired
    private PlaceRepo placeRepository;

    @Autowired
    private DestinationRepo destinationRepository;
    @Autowired
    private AccountRepo accountRepo;
    @Autowired
    private BookingRepo bookingRepo;

    @Override
    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    @Override
    public Place getPlaceById(String id) {
        return placeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Place with ID " + id + " not found!"));
    }

    private void setValueDtos(Place entity, PlaceRequest request) {
        Optional<Account> account = accountRepo.findById(request.getOwnerId());
        account.ifPresent(entity::setOwner);

        entity.setDestinationId(request.getDestinationId());
        entity.setDestinationName(request.getDestinationName());
        entity.setName(request.getName());
        entity.setImageUrl(request.getImageUrl());
        entity.setPricePerPerson(request.getPricePerPerson());
        entity.setDescription(request.getDescription());
    }

    private List<Booking> handleBookingDtos(Place place, List<Booking> bookingDtos) {
        List<Booking> bookings = new ArrayList<>();

        for (Booking bookingDto : bookingDtos) {
            Booking booking;

            if (bookingDto.getId() != null) {
                Optional<Booking> existingBooking = bookingRepo.findById(bookingDto.getId());
                if (existingBooking.isPresent()) {
                    booking = existingBooking.get();
                    booking.setCustomerName(bookingDto.getCustomerName());
                    booking.setPhone(bookingDto.getPhone());
                    booking.setEmail(bookingDto.getEmail());
                    booking.setTotalPrice(bookingDto.getTotalPrice());
                    booking.setSpecialRequests(bookingDto.getSpecialRequests());
                    booking.setNumberOfPeople(bookingDto.getNumberOfPeople());
                    booking.setStartDate(bookingDto.getStartDate());
                    booking.setPlaceId(place.getId());
                    booking.setBuyer(bookingDto.getBuyer());
                    booking.setStatusRoom(bookingDto.getStatusRoom());
                } else {
                    booking = createNewBooking(place, bookingDto);
                }
            } else {
                booking = createNewBooking(place, bookingDto);
            }

            bookings.add(booking);
        }

        return bookings;
    }

    private Booking createNewBooking(Place place, Booking bookingDto) {
        Booking booking = new Booking();
        booking.setCustomerName(bookingDto.getCustomerName());
        booking.setPhone(bookingDto.getPhone());
        booking.setEmail(bookingDto.getEmail());
        booking.setTotalPrice(bookingDto.getTotalPrice());
        booking.setSpecialRequests(bookingDto.getSpecialRequests());
        booking.setNumberOfPeople(bookingDto.getNumberOfPeople());
        booking.setStartDate(bookingDto.getStartDate());
        booking.setPlaceId(place.getId());
        booking.setBuyer(bookingDto.getBuyer());
        booking.setStatusRoom(bookingDto.getStatusRoom());
        return booking;
    }

    @Override
    public Place createPlace(PlaceRequest request) {
        Place entity = new Place();
        this.setValueDtos(entity, request);

        if (request.getBookings() != null && !request.getBookings().isEmpty()) {
            List<Booking> bookings = this.handleBookingDtos(entity, request.getBookings());
            entity.setBookings(new HashSet<>(bookings));
        }

        return placeRepository.save(entity);
    }

    @Override
    public Place updatePlace(String id, PlaceRequest request) {
        Place entity = getPlaceById(id);

        this.setValueDtos(entity, request);

        if (request.getBookings() != null) {
            List<Booking> updatedBookings = this.handleBookingDtos(entity, request.getBookings());

            // Xóa các booking cũ không còn tồn tại
            entity.getBookings().removeIf(existingBooking ->
                    updatedBookings.stream().noneMatch(updatedBooking ->
                            updatedBooking.getId().equals(existingBooking.getId())
                    )
            );

            // Thêm hoặc cập nhật các booking mới
            for (Booking updatedBooking : updatedBookings) {
                boolean exists = entity.getBookings().stream().anyMatch(existingBooking ->
                        existingBooking.getId().equals(updatedBooking.getId())
                );
                if (!exists) {
                    entity.getBookings().add(updatedBooking);
                }
            }
        }

        return placeRepository.save(entity);
    }

    @Override
    public void deletePlace(String id) {
        Place place = getPlaceById(id);
        placeRepository.delete(place);
    }

    @Override
    public List<Place> getPlacesByIds(List<String> ids) {
        return placeRepository.findByIdIn(ids);
    }

    @Override
    public List<Place> searchByName(String name) {
        return placeRepository.search(name);
    }

    @Override
    public List<Place> getPlacesByDestination(String destinationId) {
        Destination destination = destinationRepository.findById(destinationId)
                .orElseThrow(() -> new RuntimeException("Destination with ID " + destinationId + " not found!"));
        return placeRepository.findByDestinationId(destination.getId());
    }
}
