package edu.neu.cs4500;

import edu.neu.cs4500.controllers.logger.Logger;
import edu.neu.cs4500.controllers.logger.LoggerController;
import edu.neu.cs4500.controllers.logger.LoggerRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(MockitoJUnitRunner.class)
public class LoggerTest {

    @InjectMocks
    private LoggerController loggerController;
    @Mock
    private LoggerRepository loggerRepository;

    @Test
    public void testGetAllLogs() {
        Logger log1 = new Logger("/api/call/1");
        Logger log2 = new Logger("/api/call/2");
        Logger log3 = new Logger("/api/call/3");

        List<Logger> logs = new ArrayList<>();
        logs.add(log1);
        logs.add(log2);
        logs.add(log3);

        Mockito.when(loggerRepository.findAll()).thenReturn(logs);

        List<Logger> controllerLogs = loggerController.getAllLogs();

        assertEquals(controllerLogs.get(0).getApiCall(), "/api/call/1");
    }

    @Test
    public void testGettersAndSetter() {
        Logger log = new Logger();
        Date dateCreated = new Date(2398592);
        Date dateUpdated = new Date(3539835);

        log.setId(1);
        log.setApiCall("/api/call");
        log.setCreated(dateCreated);
        log.setUpdated(dateUpdated);

        assertTrue(log.getId() == 1);
        assertTrue(log.getApiCall().equals("/api/call"));
        assertTrue(log.getCreated().equals(dateCreated));
        assertTrue(log.getUpdated().equals(dateUpdated));

        log.onCreate();
        log.onUpdate();
    }
}
