<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Affiche la liste des tâches.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Task::withTrashed()->where('user_id', auth()->id())->get();
        return response()->json($tasks);
    }

    /**
     * Crée une nouvelle tâche.
     *
     * @param \App\Http\Requests\TaskRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(TaskRequest $request)
    {
        auth()->user();

        $task = Task::create($request->validated() + ['user_id' => auth()->id()]);
        return response()->json($task, 201);
    }

    public function restore($id)
    {
        try {
            $task = Task::withTrashed()
                ->where('id', $id)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            abort_if(!$task->trashed(), 400, 'Cette tâche n\'est pas supprimée');

            $task->restore();

            return response()->json([
                'message' => 'Tâche restaurée avec succès',
                'task' => $task->fresh()
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Tâche non trouvée'], 404);
        }
    }

    /**
     * Affiche les détails d'une tâche.
     *
     * @param \App\Models\Task $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        return response()->json($task);
    }

    /**
     * Met à jour une tâche existante.
     *
     * @param \App\Http\Requests\TaskRequest $request
     * @param \App\Models\Task $task
     * @return \Illuminate\Http\Response
     */
    public function update(TaskRequest $request, Task $task)
    {

        $task->update($request->validated());
        return response()->json($task);
    }

    public function updateArchive(Task $task, Request $request)
    {
        // Valide uniquement ce dont tu as besoin
        $request->validate([
            'archived' => 'boolean',
        ]);

        $task->update(['archived' => $request->archived]);

        return response()->json($task);
    }

    /**
     * Marque une tâche comme complétée.
     *
     * @param \App\Models\Task $task
     * @return \Illuminate\Http\Response
     */
    public function complete(Task $task, Request $request)
    {

        $request->validate([
            'completed' => 'required|boolean',
        ]);

        $task->update(['completed' => $request->completed, 'completed_at' =>  $request->completed ? now() : null]);


        return response()->json($task);
    }


    /**
     * Supprime une tâche.
     *
     * @param \App\Models\Task $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }


    public function forceDelete($id)
    {

        $task = Task::withTrashed()->where('id', $id)->where('user_id', auth()->id())->firstOrFail();

        $task->forceDelete();

        return response()->json(['message' => 'Tâche supprimée définitivement']);
    }
}
