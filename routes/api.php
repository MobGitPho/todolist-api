<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::get('/tasks/{task}', [TaskController::class, 'show']);
    Route::put('/tasks/{task}', [TaskController::class, 'update']);
    Route::patch('/tasks/{task}/complete', [TaskController::class, 'complete']);
    Route::patch('/tasks/{task}/archive', [TaskController::class, 'archive']);
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
});
// Route::middleware('auth:sanctum')->group(function () {
//     Route::apiResource('tasks', TaskController::class);

//     Route::post('tasks/{task}/complete', [
//         TaskController::class,
//         'complete'
//     ]);
//     Route::post('tasks/{task}/archive', [
//         TaskController::class,
//         'archive'
//     ]);
//     Route::get('/users/{userId}/tasks', [TaskController::class, 'userTasks']);
// });
