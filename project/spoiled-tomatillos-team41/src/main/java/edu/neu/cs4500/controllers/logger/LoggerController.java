package edu.neu.cs4500.controllers.logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LoggerController {

    @Autowired
    LoggerRepository loggerRepository;

    @RequestMapping("/api/logger/select/all")
    public List<Logger> getAllLogs() {
        return loggerRepository.findAll();
    }
}
