package com.example.Dates;

import com.example.Dates.entities.Date;
import com.example.Dates.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController @RequestMapping("/user") @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class userController {
    @Autowired repoUser repoUser;
    @Autowired repoDate repoDate;

    @GetMapping("/{id}/dates")
    public List<Date> getDates(@PathVariable Long id) {
        return repoUser.findById(id).get().getDates().stream().filter(date -> !date.isDeleted()).collect(Collectors.toList());
    }

    @PostMapping("/{id}/date")
    public @ResponseBody List<Date> addDate(@PathVariable Long id, @RequestBody Date date) {
        User user = repoUser.findById(id).get();
        List<Date> dates = user.getDates();
        dates.add(date);
        repoUser.save(user);
        return repoUser.findById(id).get().getDates();
    }

    @PutMapping("/{id}/date/{dateId}")
    public @ResponseBody Date updateDate(@PathVariable Long id, @PathVariable Long dateId, @RequestBody Date date) {
        User user = repoUser.findById(id).get();
        Date date1 = repoDate.findById(dateId).get();
        date1.setName(date.getName());
        date1.setHorario(date.getHorario());
        date1.setPlaneacion_previa(date.isPlaneacion_previa());
        repoDate.save(date1);
        return date1;
    }
    
    @DeleteMapping("/{id}/date/{dateId}")
    public @ResponseBody void deleteDate(@PathVariable Long id, @PathVariable Long dateId) {
        User user = repoUser.findById(id).get();
        Date date = repoDate.findById(dateId).get();
        date.setDeleted(true);
        repoDate.save(date);
    }

    @GetMapping("/all")
    public @ResponseBody List<User> getAllUsers() {
        return repoUser.findAll();
    }
    
    @PostMapping("/add")
    public @ResponseBody void addUser(@RequestBody User user) {
        repoUser.save(user);
    }
    
    @PutMapping("/{id}")
    public @ResponseBody void updateUser(@PathVariable Long id, @RequestBody User user) {
        User user1 = repoUser.findById(id).get();
        user1.setUsername(user.getUsername());
        user1.setEmail(user.getEmail());
        user1.setPassword(user.getPassword());
        repoUser.save(user1);
    }
}
