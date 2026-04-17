package com.booking.booking_management.dto.request;

import com.booking.booking_management.enums.IncidentPriority;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class IncidentTicketRequest {

    private String resource;
    private String category;
    private String description;
    private IncidentPriority priority;
    private String contactInfo;
    private String studentId;
    private List<MultipartFile> images;

    public IncidentTicketRequest() {
    }

    public IncidentTicketRequest(String resource, String category, String description, IncidentPriority priority, String contactInfo, String studentId, List<MultipartFile> images) {
        this.resource = resource;
        this.category = category;
        this.description = description;
        this.priority = priority;
        this.contactInfo = contactInfo;
        this.studentId = studentId;
        this.images = images;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public IncidentPriority getPriority() {
        return priority;
    }

    public void setPriority(IncidentPriority priority) {
        this.priority = priority;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public List<MultipartFile> getImages() {
        return images;
    }

    public void setImages(List<MultipartFile> images) {
        this.images = images;
    }
}
