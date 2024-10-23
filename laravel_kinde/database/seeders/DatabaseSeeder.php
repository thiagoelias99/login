<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::factory()->createMany([
            [
                'role' => 'admin',
                'label' => 'Administrator',
            ],
            [
                'role' => 'user',
                'label' => 'User',
            ],
        ]);
    }
}
