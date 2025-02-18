package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.DTO.request.BookingStatusRequest;
import com._cn4.nhom12.entity.Account;
import com._cn4.nhom12.entity.Booking;
import com._cn4.nhom12.entity.Place;
import com._cn4.nhom12.enums.Constant;
import com._cn4.nhom12.repository.AccountRepo;
import com._cn4.nhom12.repository.BookingRepo;
import com._cn4.nhom12.repository.PlaceRepo;
import com._cn4.nhom12.services.BookingService;
import com._cn4.nhom12.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepo bookingRepository;

    @Autowired
    private PlaceRepo placeRepository;

    @Autowired
    private RatingService ratingService;

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private QRCodeService qrCodeService;

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<Booking> getBookingsByBuyerId(String buyerId) {
        return bookingRepository.findByBuyerIdAndStatusOrder(buyerId, Constant.BOOKING_SOLD);
    }

    @Override
    public List<Booking> getBookingsByBuyerIdAndStatus(String buyerId) {
        List<String> statuses = Arrays.asList(Constant.BOOKING_SOLD, Constant.BOOKING_WAIT, Constant.BOOKING_CANCEL);
        return bookingRepository.findByBuyerIdAndStatusOrderIn(buyerId, statuses);
    }

    @Override
    public Booking getBookingById(String id) {
        return bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found!"));
    }

    @Override
    public Booking updateStatusBooking(BookingStatusRequest request) {
        Booking entity = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found for id: " + request.getBookingId())); // Ném lỗi nếu không tìm thấy booking

        entity.setStatusOrder(request.getStatusOrder());
        entity.setPurchaseDate(new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
        return bookingRepository.save(entity); // Lưu lại booking với trạng thái đã thay đổi
    }

    @Override
    public Booking updateStatusRateBooking(String bookingId) {
        Booking entity = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found for id: " + bookingId));

        entity.setIsRated(true);
        return bookingRepository.save(entity);
    }


    @Override
    public Booking createBooking(Booking booking) {
        Place place = placeRepository.findById(booking.getPlaceId()).orElseThrow(() -> new RuntimeException("Place not found!"));
        Account account = accountRepo.findById(booking.getBuyer().getId()).orElseThrow(() -> new RuntimeException("Account not found!"));
        System.out.println(booking.getNumberOfPeople() > place.getMaxPerson());
        System.out.println(place.getMaxPerson());
        System.out.println(booking.getNumberOfPeople());
        if(booking.getNumberOfPeople() > place.getMaxPerson()) {
           throw new RuntimeException("Số lượng đặt không  hợp lệ");
        }
        booking.setPlaceId(place.getId());
        booking.setPlaceImage(place.getImageUrl());
        booking.setBuyer(account);
        booking.setTotalPrice(place.getPricePerPerson() * booking.getNumberOfPeople());
        booking.setOrderCode(String.format("TVL-%07d", bookingRepository.getSum()));
        String bookingInfo = String.format("OrderCode: %s, Name: %s, Phone: %s, Place: %s, Date: %s, Price: %s",
                booking.getOrderCode(),
                booking.getCustomerName(),
                booking.getPhone(),
                booking.getPlaceName(),
                booking.getStartDate(),
                booking.getTotalPrice());
        booking.setQrCode(qrCodeService.generateQRCode(bookingInfo));
        return bookingRepository.save(booking);
    }

    @Override
    public Booking updateBooking(String id, Booking updatedBooking) {
        Place place = placeRepository.findById(updatedBooking.getPlaceId()).orElseThrow(() -> new RuntimeException("Place not found!"));
        Account account = accountRepo.findById(updatedBooking.getBuyer().getId()).orElseThrow(() -> new RuntimeException("Account not found!"));
        Booking existingBooking = getBookingById(id);
        existingBooking.setCustomerName(updatedBooking.getCustomerName());
        existingBooking.setPhone(updatedBooking.getPhone());
        existingBooking.setEmail(updatedBooking.getEmail());
        existingBooking.setStartDate(updatedBooking.getStartDate());
        existingBooking.setNumberOfPeople(updatedBooking.getNumberOfPeople());
        existingBooking.setStatusRoom(updatedBooking.getStatusRoom());
        existingBooking.setTotalPrice(place.getPricePerPerson() * updatedBooking.getNumberOfPeople());
        existingBooking.setSpecialRequests(updatedBooking.getSpecialRequests());
        existingBooking.setPlaceId(place.getId());
        existingBooking.setBuyer(account);
        existingBooking.setStatusOrder(updatedBooking.getStatusOrder());
        existingBooking.setPlaceImage(place.getImageUrl());
        String bookingInfo = String.format("OrderCode: %s, Name: %s, Phone: %s, Place: %s, Date: %s, Price: %s",
                existingBooking.getOrderCode(),
                existingBooking.getCustomerName(),
                existingBooking.getPhone(),
                existingBooking.getPlaceName(),
                existingBooking.getStartDate(),
                existingBooking.getTotalPrice());
        existingBooking.setQrCode(qrCodeService.generateQRCode(bookingInfo));
        return bookingRepository.save(existingBooking);
    }

    @Override
    public void deleteBooking(String id) {
        bookingRepository.deleteById(id);
    }

    @Override
    public List<Booking> searchByCustomerName(String customerName) {
        return bookingRepository.searchByCustomerName(customerName);
    }

    // Lấy các booking của người dùng và kiểm tra xem đã đánh giá địa điểm chưa
//    public List<BookingWithRatingDTO> getBookingsAndRatings(String buyerId) {
//        // Lấy danh sách các booking của người dùng
//        List<Booking> bookings = bookingRepository.findByBuyerId(buyerId);
//
//        // Tạo danh sách DTO kết hợp giữa booking và thông tin đánh giá
//        return bookings.stream().map(booking -> {
//            // Kiểm tra xem người dùng đã đánh giá địa điểm chưa
//            boolean hasRated = ratingService.hasRated(booking.getPlaceId(), buyerId);
//
//            return new BookingWithRatingDTO(booking, hasRated);
//        }).collect(Collectors.toList());
//    }

}
